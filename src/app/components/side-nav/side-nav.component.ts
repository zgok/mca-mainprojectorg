import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  users$ = this.userService.CurrentUserProfile$;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
  }

}
