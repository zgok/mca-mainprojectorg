import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgConfirmService } from 'ng-confirm-box';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj } from '../../models/model';

@UntilDestroy()
@Component({
  selector: 'app-cartpaymentcard',
  templateUrl: './cartpaymentcard.component.html',
  styleUrls: ['./cartpaymentcard.component.css']
})
export class CartpaymentcardComponent implements OnInit {
  user$ = this.userService.CurrentUserProfile$;
  totalPrice!: string;
  cartList: bookObj[] = [];
  userId!: string;

  constructor(private toast:HotToastService,private router: Router, private bookService: BookUploadService, private confirmService: NgConfirmService, private userService: UsersService, private route: ActivatedRoute, private orderService: OrderserviceService) { }

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe(res => {
      this.totalPrice = res['price'];
    });
    this.user$.pipe(untilDestroyed(this)).subscribe(
      (user) => {
        this.userId = user.uid;
      }
    );
    this.getAllCart();
  }
  getAllCart() {
    this.orderService.getCart().pipe(untilDestroyed(this)).subscribe({
      next: (res => {
        const obj = JSON.parse(JSON.stringify(res));
        for (var i = 0; i < obj.length; i++) {
          this.cartList.push(obj[i]);
        }
      }),
      error: (error) => { console.log(error); }
    });
  }
  onPayment() {
    this.confirmService.showConfirm("Proceed to pay?",
      () => {
        const dateoforder = new Date().toDateString();
        for (let i = 0; i < this.cartList.length; i++) {
          const oid = '';
          const bid = this.cartList[i].bid;
          const receivedorders = +this.cartList[i].receivedorders + 1;

          this.bookService.updateFrmCart({
            bid: bid, uid: this.userId, uname: this.cartList[i].uname, bname: this.cartList[i].bname, category: this.cartList[i].category, nofpages: this.cartList[i].nofpages,
            price: this.cartList[i].price, acctno: this.cartList[i].acctno, target: this.cartList[i].target, receivedorders: receivedorders.toString()
            , dateexpected: this.cartList[i].dateexpected, description: this.cartList[i].description
          }).then(() => {
            this.orderService.pay({ oid: oid, uid: this.userId, bid: bid, dateoforder: dateoforder })
          })
        }
        this.toast.success("Payment Successfull");
        console.log(this.userId);
        this.router.navigate(['/addtocartbill']);
      },
      () => { }
    )
  }
}