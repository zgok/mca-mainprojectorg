import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$ = this.userService.CurrentUserProfile$;
  userImg$=this.imgService.userprofPic$;

  constructor(private userService: UsersService,private imgService:ImageUploadService) { }

  ngOnInit(): void {

  }
}
