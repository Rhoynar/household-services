import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/index'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'topnav',
  templateUrl: './topnav.component.html'
  //styles: [main]
})
export class TopnavComponent implements AfterViewInit {
  // parties: Observable<any[]>;
  // parties: Observable<Party[]>;
  loggedIn: any;
  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    // this.parties = Parties.find({}).zone();
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }
  }

  ngAfterViewInit() {

    $(document).ready(function () {
      $(".s-box").selectbox();
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