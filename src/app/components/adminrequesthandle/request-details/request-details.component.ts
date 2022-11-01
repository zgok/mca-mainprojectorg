import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { bookObj, imgObj, userObj } from '../../models/model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from 'src/app/services/users.service';
import { NgConfirmService } from 'ng-confirm-box';

@UntilDestroy()
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  public bid!: string;
  booksList: bookObj[] = [];
  imageFile!: imgObj;
  pdfFile!: imgObj;
  authorName!: string;
  userList: userObj[] = [];

  constructor(private confirmService: NgConfirmService, private userService: UsersService, private router: Router, private toast: HotToastService, public route: ActivatedRoute, private imgService: ImageUploadService, public bookService: BookUploadService) { }

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.bid = params['bid'];
    });
    this.getBooksById(this.bid);
    this.getImageById(this.bid);
    this.getPDFById(this.bid);
  }
  getBooksById(bid: string) {
    this.bookService.getBooksById(bid).pipe(untilDestroyed(this)).subscribe(
      {
        next: (
          res => {
            const obj = JSON.parse(JSON.stringify(res));
            this.booksList.push(obj);
            this.userService.getUserById(obj.uid).pipe(untilDestroyed(this))
              .subscribe((user) => {
                const obj2 = JSON.parse(JSON.stringify(user));
                this.userList.push(obj2);
                this.authorName = obj2.username.toUpperCase();
              })
          }
        ),
        error: (error) => { console.log(error) }
      }
    )
  }
  getImageById(bid: string) {
    this.imgService.booksProfile(bid).pipe(untilDestroyed(this)).subscribe(
      (res) => {
        this.imageFile = res;
      }
    );
  }
  getPDFById(bid: string) {
    this.imgService.getPDF(bid).pipe(untilDestroyed(this)).subscribe((res) => {
      this.pdfFile = res;
    });
  }
  reject(customer: bookObj) {
    this.confirmService.showConfirm("Reject " + customer.uname + "?", () => {
      this.bookService.deleteCustomerRequest(customer);
      this.imgService.imageDelete(customer.bid);
      this.imgService.pdfDelete(customer.bid);
      this.toast.success('Rejected successfully');
      this.router.navigate(['/reqlist']);
    }, () => { });
  }
  accept(customer: bookObj) {
    this.bookService.acceptedPublishRequests(customer).pipe(untilDestroyed(this),
      this.toast.observe({
        success: 'Accepted!!!!',
        loading: 'Processing...',
        error: ({ msg }) => `${msg}`
      })
    ).subscribe(() => {
      this.router.navigate(['/reqlist']);
    });
  }
}



