import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgConfirmService } from 'ng-confirm-box';
import { bookObj } from 'src/app/components/models/model';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-published-customers',
  templateUrl: './published-customers.component.html',
  styleUrls: ['./published-customers.component.css']
})
export class PublishedCustomersComponent implements OnInit {

  pcustomers: bookObj[] = [];

  constructor(private orderService:OrderserviceService,private userService: UsersService, private confirmService: NgConfirmService,private router:Router) { }

  ngOnInit(): void {
    this.getPublishedCustomers();
  }
  getPublishedCustomers() {
    this.userService.getPublishedCust().pipe(untilDestroyed(this)).subscribe({
      next: (res => {
        this.pcustomers = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      }),
      error: (error => { console.log(error) })
    });
  }
  unifinished(customer: bookObj) {
    this.confirmService.showConfirm("Unfinish the Project ?",
      () => {
        this.orderService.unfinishedProject(customer).then(()=>{this.router.navigate(['/customerdet'])});
      },
      () => {
        // console.log("No");
      });
  }
}
