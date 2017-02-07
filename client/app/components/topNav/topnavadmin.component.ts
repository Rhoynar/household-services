import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, CommunityServices } from '../../services/index'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'topnav-admin',
  templateUrl: './topnavadmin.component.html',
  //inputs: ['communityId','communityName']
  //styles: [main]
})
export class AdminTopnavComponent implements AfterViewInit {


  loggedIn: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private communityService: CommunityServices) {

    this.authenticationService.generatetoken()
      .subscribe(result => {

        var currentUserStr = localStorage.getItem('currentUser')
        var currentUser = JSON.parse(currentUserStr);
        if (currentUserStr) { //if user is there
            if (currentUser.token.role == "admin") {  //if current user is admin
                this.loggedIn= true;
            }
        }


        if (localStorage.getItem('currentUser')) {
          // logged in so return true
          this.loggedIn = true;
        }
      });

  }

  logout() {
    // reset login status
    this.authenticationService.logout()
      .subscribe(
      data => {

        this.router.navigate(['/admin/login']);
        //return false;
      },
      error => {
        this.router.navigate(['/admin/login']);
      }
      );

  }



  ngAfterViewInit() {

  }



}