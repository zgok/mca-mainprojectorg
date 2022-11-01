import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgConfirmService } from 'ng-confirm-box';
import { userObj } from 'src/app/components/models/model';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList: userObj[] = [];
  constructor(private toast:HotToastService,private userService: UsersService,private confirmService:NgConfirmService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.userService.getAllUsers().pipe(untilDestroyed(this)).subscribe(
      {
        next: (res => {
          this.customerList = res.map(
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
    );
  }

  deleteCustomer(customer:userObj){
    this.confirmService.showConfirm("Are you sure you want to delete "+customer.username+"?",
    ()=>{
      this.userService.deleteCustomer(customer);
      this.toast.success("deleted");
    },
    ()=>{});
  }
}