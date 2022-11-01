import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj, orderObj, userObj } from '../../models/model';

@UntilDestroy()
@Component({
  selector: 'app-customerorders',
  templateUrl: './customerorders.component.html',
  styleUrls: ['./customerorders.component.css']
})
export class CustomerordersComponent implements OnInit {

  public bid!: string;
  orderList: orderObj[] = [];
  bookArray: Array<bookObj> = [];
  customersList: userObj[] = [];
  sample: [] = [];

  constructor(private route: ActivatedRoute, private orderService: OrderserviceService, private bookService: BookUploadService, private userService: UsersService) { }

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe(res => {
      this.bid = res['bid'];
    });
   // this.getOrderedCustomers();
   // this.getBookById(this.bid);
    this.getAllCustomers(this.bid);
  }
  getAllCustomers(bid:string) {
    this.userService.getAllUsers().pipe(untilDestroyed(this)).subscribe({
      next: (res => {
        this.customersList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      }),
      error: (error) => { console.log(error) }
    });

    this.orderService.getAllOrderedCustomers().pipe(untilDestroyed(this)).subscribe(
      {
        next: (res => {
          this.orderList = res.map(
            (e: any) => {
              const data = e.payload.doc.data();
              data.id = e.payload.doc.id;
              return data;
            }
          )
        }),
        error: (error) => { console.log(error) }
      }
    );
    this.bookService.getItemPublished(bid).pipe(untilDestroyed(this)).subscribe(
      {
        next: (
          res => {
            const obj = JSON.parse(JSON.stringify(res));
            this.bookArray.push(obj);
          }
        ),
        error: (error) => { console.log(error) }
      }
    );
  }
  // getOrderedCustomers() {
  //   this.orderService.getAllOrderedCustomers().pipe(untilDestroyed(this)).subscribe(
  //     {
  //       next: (res => {
  //         this.orderList = res.map(
  //           (e: any) => {
  //             const data = e.payload.doc.data();
  //             data.id = e.payload.doc.id;
  //             return data;
  //           }
  //         )
  //       }),
  //       error: (error) => { console.log(error) }
  //     }
  //   );
  // }
  // getBookById(bid: string) {
  //   this.bookService.getItemPublished(bid).pipe(untilDestroyed(this)).subscribe(
  //     {
  //       next: (
  //         res => {
  //           const obj = JSON.parse(JSON.stringify(res));
  //           this.bookArray.push(obj);
  //         }
  //       ),
  //       error: (error) => { console.log(error) }
  //     }
  //   );
  // }
}
