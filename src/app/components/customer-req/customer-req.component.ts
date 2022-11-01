import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { bookObj, orderObj, userObj } from 'src/app/components/models/model';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-customer-req',
  templateUrl: './customer-req.component.html',
  styleUrls: ['./customer-req.component.css']
})
export class CustomerReqComponent implements OnInit {

  orderItemList: bookObj[] = [];
  user$ = this.userService.CurrentUserProfile$;
  receieved: number = 10;
  total: number = 100;
  public userId!: string;

  constructor(private bookService: BookUploadService, private userService: UsersService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }
  getAllBooks() {
    this.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.userId = user.uid;
      this.bookService.getAllAcceptedRequests().pipe(untilDestroyed(this)).subscribe(
        {
          next: (res => {
            res.map(
              (e: any) => {
                const data = e.payload.doc.data();
                data.id = e.payload.doc.id;
                if (this.userId == data.uid) {
                  this.orderItemList.push(data);
                }
              }
            )
          }
          ),
          error: (error => { console.log(error) })
        }
      )
    });
  }


  // getAllBooks() {
  //   this.bookService.getAllAcceptedRequests().pipe(untilDestroyed(this)).subscribe(
  //     {
  //       next: (res => {
  //         this.orderItemList = res.map(
  //           (e: any) => {
  //             const data = e.payload.doc.data();
  //             data.id = e.payload.doc.id;
  //             return data;
  //           }
  //         )
  //       }
  //       ),
  //       error: (error => { console.log(error) })
  //     }
  //   )
  // }
  remove(order: orderObj) { }

}
