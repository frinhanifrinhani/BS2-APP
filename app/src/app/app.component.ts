import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    mostrarMenu: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        
    }

    ngOnInit() {
      this.authenticationService.mostrarMenuEmiter.subscribe(
       mostrar => this.mostrarMenu = mostrar
      );
    }
    
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
