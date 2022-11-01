import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj } from '../../models/model';

@UntilDestroy()
@Component({
  selector: 'app-addtocartbill',
  templateUrl: './addtocartbill.component.html',
  styleUrls: ['./addtocartbill.component.css']
})
export class AddtocartbillComponent implements OnInit {

  userId!: string;
  localDate: string = new Date().toDateString();
  cartList: bookObj[] = [];
  public totalPrice!: string;
  user$ = this.userService.CurrentUserProfile$;

  constructor(private orderService: OrderserviceService, private bookService: BookUploadService, private route: ActivatedRoute, private userService: UsersService) { }

  ngOnInit(): void {
    console.log(this.userId);
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
  print() {
    window.print();
  }
}
