import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj } from '../models/model';

@UntilDestroy()
@Component({
  selector: 'app-rejected-requests',
  templateUrl: './rejected-requests.component.html',
  styleUrls: ['./rejected-requests.component.css']
})
export class RejectedRequestsComponent implements OnInit {

  user$ = this.userService.CurrentUserProfile$;
  public userId!: string;
  rejectedList: bookObj[] = [];

  constructor(private bookService: BookUploadService, private userService: UsersService) { }

  ngOnInit(): void {
    this.getAllrejected();
  }

  getAllrejected() {
    this.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.userId = user.uid;
      this.bookService.getRejectedRequest().pipe(untilDestroyed(this)).subscribe(
        {
          next: (res => {
            res.map(
              (e: any) => {
                const data = e.payload.doc.data();
                data.id = e.payload.doc.id;
                if (this.userId == data.uid) {
                  this.rejectedList.push(data);
                }
              })
          }),
          error: (error => { console.log(error); })
        }
      );
    });
  }

}
