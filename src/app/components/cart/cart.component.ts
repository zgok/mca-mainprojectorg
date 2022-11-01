import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj, imgObj } from '../models/model';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user$ = this.userService.CurrentUserProfile$;
  public userId!: string;
  cartList: bookObj[] = [];
  public totalPrice!: string;
  public userid!:string;
  fileList:imgObj[]=[];

  constructor(private router: Router,private storage:AngularFireStorage, private userService: UsersService, private orderService: OrderserviceService) { }

  ngOnInit(): void {
    this.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.userId = user.uid;
    }
    );
    this.getAllCart();
    this.getAllCartImages();
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
  getAllCartImages(){
    const ref = this.storage.ref('/images/books/');
    ref.listAll().pipe(untilDestroyed(this)).subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.storage.ref('/images/books/' + data.items[i].name);
        newref.getDownloadURL().pipe(untilDestroyed(this)).subscribe(
          (res) => {
            this.fileList.push({
              name: name, url: res
            });
          }
        );
      }
    })
  }
  removeItem(item: bookObj) {
    this.orderService.deleteCartItem(item).pipe(untilDestroyed(this)).subscribe(() => {
      location.reload();
    });
  }
}

