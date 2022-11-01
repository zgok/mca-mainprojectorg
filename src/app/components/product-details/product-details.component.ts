import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj, imgObj } from '../models/model';

@UntilDestroy()
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public bid!: string;
  bookItem: bookObj[] = [];
  pdfFile!: imgObj;
  imageFile!: imgObj;
  user$ = this.userService.CurrentUserProfile$;
  userid!: string;
  authorName!: string;

  constructor(private orderService: OrderserviceService, private route: ActivatedRoute, private toast: HotToastService, private bookService: BookUploadService, private imgService: ImageUploadService, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe((res) => {
      this.bid = res['bid'];
    });
    this.getProduct(this.bid);
    this.getImageById(this.bid);
    this.getPDFById(this.bid);
  }

  getProduct(bid: string) {
    this.bookService.getItemPublished(bid).pipe(untilDestroyed(this)).subscribe(
      {
        next: (res => {
          const obj = JSON.parse(JSON.stringify(res));
          this.bookItem.push(obj);
          this.userService.getUserById(obj.uid).pipe(untilDestroyed(this))
            .subscribe((user) => {
              const obj2 = JSON.parse(JSON.stringify(user));
              this.authorName = obj2.username.toUpperCase();
            })
        }),
        error: (error) => { console.log(error); }
      }
    );
  }

  // getProduct(bid: string) {
  //   this.bookService.getItemPublished(bid).pipe(untilDestroyed(this)).subscribe(
  //     {
  //       next: (res => {
  //         const obj = JSON.parse(JSON.stringify(res));
  //         this.bookItem.push(obj);
  //       }),
  //       error: (error) => { console.log(error); }
  //     }
  //   );
  // }
  // getAuthor(){
  //   this.userService.getAllUsers().pipe(untilDestroyed(this)).subscribe((res)=>{
  //     console.log(res);
  //   });
  // }
  getPDFById(bid: string) {
    this.imgService.getPDF(bid).pipe(untilDestroyed(this)).subscribe((res) => {
      this.pdfFile = res;
    })
  }
  getImageById(bid: string) {
    this.imgService.booksProfile(bid).pipe(untilDestroyed(this)).subscribe(
      (res) => {
        this.imageFile = res;
      }
    );
  }
  ordernow(item: bookObj) {
    this.user$.pipe(untilDestroyed(this)).subscribe(
      (user) => {
        if (user) {
          this.userid = user.uid;
          this.router.navigate(['/orderbill', item.bid]);
        }
        else {
          this.toast.warning("Login to continue...");
        }
      }
    );
  }
  addtocart(item: bookObj) {
    this.user$.pipe(untilDestroyed(this)).subscribe(
      (user) => {
        if (user) {
          this.orderService.addtocart(item).
            pipe(untilDestroyed(this), this.toast.observe({
              success: 'Item added to cart',
              loading: 'Adding to cart...',
              error: ({ message }) => `${message}`,
            })).subscribe();
        } else {
          this.toast.warning("Login to continue...");
        }
      })
  }
}
