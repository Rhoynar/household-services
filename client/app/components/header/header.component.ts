import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../services/index'

@Component({
  moduleId: module.id,
  selector: 'top-header',
  templateUrl: './header.component.html'
  //styles: [main]
})
export class HeaderComponent {

  /*local variables*/
  loggedIn: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {


    this.authenticationService.generatetoken()
      .subscribe(result => {
        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        if (currentUserStr) { //if user is there
          if (currentUser.token.role == "user") {  //if current user is admin
            this.loggedIn = true;
          }
        } else {
          this.loggedIn = false;
        }
      });

  }


  logout() {
    // reset login status
    this.authenticationService.logout()
      .subscribe(
      data => {

        this.router.navigate(['/login']);
        //return false;
      },
      error => {
        this.router.navigate(['/login']);
      }
      );

  }


}