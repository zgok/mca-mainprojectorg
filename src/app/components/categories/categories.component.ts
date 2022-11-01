import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { UsersService } from 'src/app/services/users.service';
import { bookObj, imgObj } from "../models/model";

@UntilDestroy()
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  allBooks: bookObj[] = [];
  fileList: imgObj[] = [];
  user$ = this.userService.CurrentUserProfile$;
  userid: any;
  searchTxt!: string;

  constructor(private spinner: NgxSpinnerService, private router: Router, private toast: HotToastService, private storage: AngularFireStorage, private bookService: BookUploadService, private userService: UsersService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllBooks();
    this.imageList();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000)
  }

  getAllBooks() {
    this.bookService.getAllAcceptedRequests().pipe(untilDestroyed(this)).subscribe(
      {
        next: (res => {
          this.allBooks = res.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          })
        }),
        error: (error => { console.log(error) })
      }
    );
  }
  imageList() {
    const ref = this.storage.ref('/images/books/');
    ref.listAll().pipe(untilDestroyed(this)).subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.storage.ref('/images/books/' + data.items[i].name);
        newref.getDownloadURL().pipe(untilDestroyed(this)).subscribe(
          (res) => {
            this.fileList.push({
              name: name, url: res
            });
          }
        );
      }
    })
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
  search(item: string) {
    this.bookService.searchItem(item).pipe(untilDestroyed(this)).subscribe(
      res => {
        this.allBooks = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      }
    )
  }
  searchByName() {
    this.bookService.searchByName(this.searchTxt.toLowerCase()).pipe(untilDestroyed(this)).subscribe(
      res => {
        this.allBooks = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      }
    )
  }
}
