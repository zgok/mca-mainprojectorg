import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj } from '../models/model';

@UntilDestroy()
@Component({
  selector: 'app-customer-bill',
  templateUrl: './customer-bill.component.html',
  styleUrls: ['./customer-bill.component.css']
})
export class CustomerBillComponent implements OnInit {

  bid!: string;
  user$ = this.userService.CurrentUserProfile$;
  localDate: string = new Date().toDateString();
  bookItem: bookObj[] = [];

  constructor(private bookService: BookUploadService, private route: ActivatedRoute, private userService: UsersService) { }

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe((res) => {
      this.bid = res['bid'];
    })
    console.log(this.bid);
    this.getItem(this.bid);
  }
  getItem(bid: string) {
    this.bookService.getItemPublished(bid).pipe(untilDestroyed(this)).subscribe(
      {
        next: (
          res => {
            const obj = JSON.parse(JSON.stringify(res));
            this.bookItem.push(obj);
          }
        ),
        error: (error) => { console.log(error) }
      }
    );
  }
  print() {
    window.print();
  }

}
