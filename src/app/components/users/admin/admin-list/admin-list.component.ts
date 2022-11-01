import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgConfirmService } from 'ng-confirm-box';
import { adminObj } from 'src/app/components/models/model';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  adminList: adminObj[] = [];

  constructor(private toast: HotToastService, private userService: UsersService, private confirmService: NgConfirmService) { }

  ngOnInit(): void {
    this.getAllAdmin();
  }

  getAllAdmin() {
    this.userService.getAllUsers().pipe(untilDestroyed(this)).subscribe(
      {
        next: (res => {
          this.adminList = res.map(
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

  deleteadmin(admin: adminObj) {
    this.confirmService.showConfirm("Are you sure you want to delete " + admin.firstname + "?",
      () => {
        this.userService.deleteAdmin(admin);
        this.toast.success("deleted");
      },
      () => { });
  }

}
