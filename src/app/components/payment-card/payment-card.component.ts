import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgConfirmService } from 'ng-confirm-box';
import { NgxSpinnerService } from 'ngx-spinner';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj } from '../models/model';

@UntilDestroy()
@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.css']
})
export class PaymentCardComponent implements OnInit {

  bid!: string;
  user$ = this.userService.CurrentUserProfile$;
  bookItem: bookObj[] = [];
  public userId!: string;
  public targetprice!: number;
  public taxamount!: number;
  public total!: number;
  public itemPrice!: string;

  constructor(private spinner: NgxSpinnerService, private confirmService: NgConfirmService, private router: Router, private toast: HotToastService, private orderService: OrderserviceService, private route: ActivatedRoute, private userService: UsersService, private bookService: BookUploadService) { }

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe((res) => {
      this.bid = res['bid'];
    })
    this.user$.pipe(untilDestroyed(this)).subscribe(
      (user) => {
        this.userId = user.uid;
      }
    );
    this.payment(this.bid);
  }
  payment(bid: string) {
    this.bookService.getItemPublished(bid).pipe(untilDestroyed(this)).subscribe(
      {
        next: (
          res => {
            const obj = JSON.parse(JSON.stringify(res));
            this.targetprice = Number(obj.target) * Number(obj.receivedorders);
            this.taxamount = (this.targetprice * 2) / 100;
            this.total = this.targetprice - this.taxamount;
            this.bookItem.push(obj);
            this.itemPrice = obj.price;
          }
        ),
        error: (error) => { console.log(error) }
      }
    );
  }
  onPayement() {
    this.confirmService.showConfirm("Proceed to pay ?",
      () => {
        for (let i = 0; i < this.bookItem.length; i++) {
          const oid = '';
          const bid = this.bid;
          const userid = this.userId;
          const dateoforder = new Date().toDateString();
          const receivedorders = + this.bookItem[i].receivedorders + 1;
          this.spinner.show();
          this.bookService.updateFrmCart({
            bid: this.bookItem[i].bid, uid: this.bookItem[i].uid, uname: this.bookItem[i].uname, bname: this.bookItem[i].bname, category: this.bookItem[i].category,
            nofpages: this.bookItem[i].nofpages, price: this.bookItem[i].price, acctno: this.bookItem[i].acctno, target: this.bookItem[i].target, receivedorders: receivedorders.toString(), dateexpected: this.bookItem[i].dateexpected
            , description: this.bookItem[i].description
          })
            .then(() => {
              this.orderService.pay({
                oid: oid, uid: userid, bid: bid, dateoforder: dateoforder
              }).then(() => {
                this.router.navigate(['/customerbill', this.bookItem[i].bid]);
                setTimeout(() => {
                  this.spinner.hide();
                }, 1000);
                this.toast.success("Payment Successfull");
              })
            });
        }
      },
      () => { });
    // this.confirmService.showConfirm("Proceed to pay ?",
    //   () => {
    //     const oid = '';
    //     const bid = this.bid;
    //     const userid = this.userId;
    //     const dateoforder = new Date().toDateString();
    //     const receivedorders = + item.receivedorders + 1;
    //     this.spinner.show();
    //     this.bookService.updateFrmCart({
    //       bid: item.bid, uid: item.uid, uname: item.uname, bname: item.bname, category: item.category,
    //       nofpages: item.nofpages, price: item.price, acctno: item.acctno, target: item.target, receivedorders: receivedorders.toString(), dateexpected: item.dateexpected
    //       , description: item.description
    //     })
    //       .then(() => {
    //         this.orderService.pay({
    //           oid: oid, uid: userid, bid: bid, dateoforder: dateoforder
    //         }).then(() => {
    //           this.router.navigate(['/customerbill', item.bid]);
    //           setTimeout(() => {
    //             this.spinner.hide();
    //           }, 4000);
    //           this.toast.success("Payment Successfull");
    //         })
    //       });
    //   },
    //   () => { });

  }
  adminPayment(item: bookObj) {
    this.confirmService.showConfirm("Proceed to pay ?", () => {
      this.spinner.show();
      this.orderService.finishedProject(item).then(() => { this.router.navigate(['/categories']) });
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    }, () => { })
  }
}




