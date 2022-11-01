import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgConfirmService } from 'ng-confirm-box';
import { bookObj, orderObj, userObj } from 'src/app/components/models/model';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-ordered-customers',
  templateUrl: './ordered-customers.component.html',
  styleUrls: ['./ordered-customers.component.css']
})
export class OrderedCustomersComponent implements OnInit {

  orderList: orderObj[] = [];
  orderCustomers: userObj[] = [];
  orderItemList: bookObj[] = [];

  constructor(private confirmService: NgConfirmService, private toast: HotToastService, private bookService: BookUploadService, private orderService: OrderserviceService, private userService: UsersService) { }

  ngOnInit(): void {
    this.getAllOrderedCustomers();
    this.getAllCustomers();
    this.getAllBooks();
  }

  getAllOrderedCustomers() {
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
  }
  getAllCustomers() {
    this.userService.getAllUsers().pipe(untilDestroyed(this)).subscribe(
      {
        next: (res => {
          this.orderCustomers = res.map(
            (e: any) => {
              const data = e.payload.doc.data();
              data.id = e.payload.doc.id;
              return data;
            }
          )
        }
        ),
        error: (error => { console.log(error) })
      }
    )
  }
  getAllBooks() {
    this.bookService.getAllAcceptedRequests().pipe(untilDestroyed(this)).subscribe(
      {
        next: (res => {
          this.orderItemList = res.map(
            (e: any) => {
              const data = e.payload.doc.data();
              data.id = e.payload.doc.id;
              return data;
            }
          )
        }
        ),
        error: (error => { console.log(error) })
      }
    )
  }
  remove(order: orderObj) {
    this.confirmService.showConfirm("Are you sure want to delete this order ?", () => {
      this.orderService.deleteOrderedCustomer(order).then(() => {
        this.toast.success("Deleted");
      });
    }, () => { });
  }
}
