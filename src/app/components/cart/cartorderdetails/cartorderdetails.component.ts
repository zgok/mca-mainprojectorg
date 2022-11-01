import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj } from '../../models/model';

@UntilDestroy()
@Component({
  selector: 'app-cartorderdetails',
  templateUrl: './cartorderdetails.component.html',
  styleUrls: ['./cartorderdetails.component.css']
})
export class CartorderdetailsComponent implements OnInit {

  user$ = this.userService.CurrentUserProfile$;
  public userId!: string;
  cartList: bookObj[] = [];
  public totalPrice!: string;
  public userid!:string;
  localDate: string = new Date().toDateString();

  constructor(private router: Router, private userService: UsersService, private orderService:OrderserviceService) { }

  ngOnInit(): void {
    this.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.userId = user.uid;
    }
    );
    this.getAllCart();
  }
   getAllCart() {
    this.orderService.getCart().pipe(untilDestroyed(this)).subscribe(
      {
        next: (res => {
          const obj = JSON.parse(JSON.stringify(res));
          let price = 0;
          for (var i = 0; i < obj.length; i++) {
            this.cartList.push(obj[i]);
          }
          for (i = 0; i < this.cartList.length; i++) {
            price = price + Number(this.cartList[i].price);
          }
          this.totalPrice = price.toString();
        }),
        error: (error) => { console.log(error); }
      }
    );
  }
  pay(item: any) {
    this.router.navigate(['/paymentcard', item.bid]);
  }
}
