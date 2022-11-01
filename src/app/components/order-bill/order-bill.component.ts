import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj } from '../models/model';

@UntilDestroy()
@Component({
  selector: 'app-order-bill',
  templateUrl: './order-bill.component.html',
  styleUrls: ['./order-bill.component.css']
})
export class OrderBillComponent implements OnInit {

  user$ = this.userService.CurrentUserProfile$;
  bid!: string;
  bookItem: bookObj[] = [];
  localDate: string = new Date().toDateString();

  constructor(private router: Router, private route: ActivatedRoute, private userService: UsersService, private bookService: BookUploadService) { }

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe((res) => {
      this.bid = res['bid'];
    });
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
  pay(item: any) {
    this.router.navigate(['/paymentcard', item.bid]);
  }
}


