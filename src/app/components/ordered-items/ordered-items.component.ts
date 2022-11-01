import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj, orderObj } from '../models/model';

@UntilDestroy()
@Component({
  selector: 'app-ordered-items',
  templateUrl: './ordered-items.component.html',
  styleUrls: ['./ordered-items.component.css']
})
export class OrderedItemsComponent implements OnInit {

  orderList: orderObj[] = [];
  user$ = this.userService.CurrentUserProfile$;
  userId!: string;
  bookList: bookObj[] = [];

  constructor(private spinner: NgxSpinnerService, private orderService: OrderserviceService, private bookService: BookUploadService, private userService: UsersService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllOrders();
   // this.getAllBooks();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  getAllOrders() {
    this.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.userId = user.uid;
      this.orderService.getAllOrderedCustomers().pipe(untilDestroyed(this)).subscribe(
        {
          next: (res => {
             res.map(
              (e: any) => {
                const data = e.payload.doc.data();
                data.id = e.payload.doc.id;
                if (this.userId == data.uid) {
                //  return data;
                      this.orderList.push(data);
                }
              }
            )
          }),
          error: (error) => { console.log(error); }
        }
      );
    });
    this.bookService.getAllAcceptedRequests().pipe(untilDestroyed(this)).subscribe({
      next: (res => {
        this.bookList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
          //  this.bookList.push(data);
        })
      }),
      error: (error) => { console.log(error); }
    });
  }
  // getAllBooks() {
  //   this.bookService.getAllAcceptedRequests().pipe(untilDestroyed(this)).subscribe({
  //     next: (res => {
  //       this.bookList = res.map((e: any) => {
  //         const data = e.payload.doc.data();
  //         data.id = e.payload.doc.id;
  //         return data;
  //         //  this.bookList.push(data);
  //       })
  //     }),
  //     error: (error) => { console.log(error); }
  //   });
  // }

}
