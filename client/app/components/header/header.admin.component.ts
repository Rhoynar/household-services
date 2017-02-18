import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/index'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'top-admin-header',
  templateUrl: './header.admin.component.html',
  //inputs: ['communityId','communityName']
  //styles: [main]
})
export class AdminHeaderComponent implements AfterViewInit {


  public loggedIn: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {

    this.authenticationService.generatetoken()
      .subscribe(result => {

        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        if (currentUserStr) { //if user is there
          if (currentUser.token.role == "admin") {  //if current user is admin
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



  ngAfterViewInit() {

  }



}