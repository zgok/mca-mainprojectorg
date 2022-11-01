import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  adminreg!: FormGroup;

  constructor(private router:Router,private auth: AuthService, private userService: UsersService,private toast:HotToastService) {
    this.adminreg = new FormGroup({});
  }

  ngOnInit(): void {
    this.adminreg = new FormGroup({
      firstname: new FormControl(""),
      lastname: new FormControl(""),
      position: new FormControl(""),
      street: new FormControl(""),
      zipcode: new FormControl(""),
      place: new FormControl(""),
      country: new FormControl(""),
      code: new FormControl(""),
      phno: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
    });
  }
  addAdmin() {
    const { firstname, lastname, position, street, zipcode, place, country, code, phno, email, password } = this.adminreg.value;
    console.log("pass" + password);
    const roles = 'admin';
    this.auth.signUp(email, password).
      pipe(
        switchMap(({ user: { uid } }) => {
          return this.userService.addAdmin({
            uid: uid, firstname: firstname, lastname: lastname, position: position,
            street: street, zipcode: zipcode, place: place, country: country,
            code: code, phno: phno, email: email, password: password,roles:roles
          });
        }),this.toast.observe({
          success:'Admin added',
          loading:'please wait',
          error:({message})=>`${message}`
        })
      ).subscribe(()=>{this.router.navigate(['/admindet']);});
  }
}
