import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { FileUpload } from '../models/model';
import { UsersService } from 'src/app/services/users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BookUploadService } from 'src/app/services/book-upload.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$ = this.userService.CurrentUserProfile$;
  userImg$ = this.img.userprofPic$;

  @Output() sideNavToggled = new EventEmitter<boolean>();
  sideNavStatus: boolean = true;
  repeatPass: string = 'none';
  registerForm: FormGroup;
  loginForm: FormGroup;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  userId!: string;

  constructor(private bookService: BookUploadService, private auth: AuthService, private userService: UsersService, private router: Router, private toast: HotToastService, private img: ImageUploadService) {
    this.registerForm = new FormGroup({});
    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]),
      mobile: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]*")]),
      address: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      pwd: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      rpwd: new FormControl("", Validators.required)
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormControl('', [Validators.required]),
    });
  }

  menuButtonClicked() {
    this.sideNavStatus = !this.sideNavStatus;
    this.sideNavToggled.emit(this.sideNavStatus);//emited will go to app.component.html header space
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  createAccount() {
    const { name, email, address } = this.registerForm.value;
    const roles = 'customer';
    if (this.PWD.value == this.RPWD.value) {
      this.repeatPass = 'none';
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
        this.selectedFiles = undefined;
        if (file) {
          this.auth.signUp(email, this.PWD.value).pipe(
            switchMap(({ user: { uid } }) => {
              return this.userService.addUser({
                uid: uid, username: name, phno: this.Mobile.value, email: email,
                address: address, roles: roles
              })
                .pipe(switchMap(() => {
                  return this.img.uploadImage(file, `images/profile/${uid}`)
                }
                ))
            }),
            this.toast.observe({
              success: 'Congrats! You are all signed up',
              loading: 'Signing up...',
              error: ({ message }) => `${message}`,
            })
          )
            .subscribe(() => {
              this.registerForm.reset();
              this.router.navigate(['/categories']);
            });
        }
      }
    } else {
      this.repeatPass = 'inline';
    }
  }

  loginUser() {
    // console.log(this.loginForm.value.email);
    const { email } = this.loginForm.value;
    this.auth.login(email, this.LPWD.value)
      .pipe(untilDestroyed(this), this.toast.observe({
        success: 'Logged in Successfully',
        loading: 'Logging in...',
        error: 'Check your email and password',
      })).subscribe(() => {
        this.loginForm.reset();
        this.router.navigate(['/categories']);
      })
  }
  logout() {
    this.auth.logout().pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['/'])
      });
  }

  get Name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get Address(): FormControl {
    return this.registerForm.get('address') as FormControl;
  }
  get PWD(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }
  get RPWD(): FormControl {
    return this.registerForm.get("rpwd") as FormControl;
  }
  get LEmail(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get LPWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
