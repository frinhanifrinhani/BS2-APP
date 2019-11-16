import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showMenu: boolean = false;
  authUser = this.getAuthUser();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {

  }

  getAuthUser() {
    if (this.authenticationService.currentUserValue) {
      let authUser = this.authenticationService.currentUserValue;
      this.showMenu = true;
      return authUser;
    }
  }

  logout() {
    this.authenticationService.logout();
    location.reload();
  }
}
