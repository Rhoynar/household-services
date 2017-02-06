import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, CommunityServices } from '../../services/index'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'topnav-one',
  templateUrl: './topnavone.component.html',
  //inputs: ['communityId','communityName']
  //styles: [main]
})
export class TopnavOneComponent implements AfterViewInit {


  loggedIn: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private communityService: CommunityServices) {

    this.authenticationService.generatetoken()
      .subscribe(result => {
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