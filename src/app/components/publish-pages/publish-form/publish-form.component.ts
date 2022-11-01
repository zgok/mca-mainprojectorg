import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgConfirmService } from 'ng-confirm-box';
import { switchMap } from 'rxjs';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';
import { userObj } from '../../models/model';

@UntilDestroy()
@Component({
  selector: 'app-publish-form',
  templateUrl: './publish-form.component.html',
  styleUrls: ['./publish-form.component.css']
})
export class PublishFormComponent implements OnInit {

  publishForm: FormGroup;
  user$ = this.userService.CurrentUserProfile$;
  ngOptions = ['Fiction', 'Biography', 'History', 'Poetry', 'Comic'];
  ngSelected = this.ngOptions[0];
  selectedFiles?: FileList;
  selectedPDF?: FileList;
  constructor(private confirmService: NgConfirmService, private img: ImageUploadService, private router: Router, private toast: HotToastService, private formBuilder: FormBuilder, private userService: UsersService, private bookService: BookUploadService) {
    this.publishForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.publishForm = new FormGroup({
      bname: new FormControl(""),
      category: new FormControl(""),
      nofpages: new FormControl(""),
      price: new FormControl(""),
      acctno: new FormControl(""),
      target: new FormControl(""),
      dateexpected: new FormControl(""),
      description: new FormControl(""),
    });
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  selectPDF(e: any): void {
    this.selectedPDF = e.target.files;
  }
  selectedCategory(e: any): void {
    this.ngSelected = e.target.value;
  }

  publishBook(user: userObj) {
    const userUID = user.uid;
    const userName = user.username;
    const { bname, nofpages, price, acctno, target, dateexpected, description } = this.publishForm.value;
    const bookid = '';
    if (target > 50) {
      if (this.selectedFiles) {
        if (this.selectedPDF) {
          const file: File | null = this.selectedFiles.item(0);
          const pdfFile: File = this.selectedPDF.item(0)!;
          this.selectedFiles = undefined;
          this.selectedPDF = undefined;
          if (file) {
            this.confirmService.showConfirm("Request to Admin?", () => {
              this.bookService.addBook({
                bid: bookid, uid: userUID, uname: userName,
                bname: bname.toLowerCase(), category: this.ngSelected, nofpages: nofpages
                , price: price, acctno: acctno, target: target, receivedorders: '0', dateexpected: dateexpected
                , description: description
              }).pipe(untilDestroyed(this), switchMap((bid) => {
                return this.img.uploadImage(file, `images/books/${bid}`).
                  pipe(untilDestroyed(this), switchMap(() => {
                    return this.img.uploadFile(pdfFile, bid);
                  }));
              }),
                this.toast.observe({
                  success: 'Requested',
                  loading: 'Requesting progeress...',
                  error: ({ message }) => `${message}`,
                })).subscribe(() => {
                  this.router.navigate(['/publish']);
                });
            }, () => { })
          }
        }
      }
    }
  }
}