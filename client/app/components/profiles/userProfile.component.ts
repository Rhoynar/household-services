import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, UserServices } from '../../services/index'

declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'user-profile',
  templateUrl: './userProfile.component.html'
  //styles: [main]
})
export class UserProfileComponent implements AfterViewInit, OnInit {
  public userProfile: any = {};
  public pagetitle: String = 'User Profile';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserServices
  ) {

    this.authenticationService.generatetoken()
      .subscribe(result => {
        if (result === false) {
          this.router.navigate(['/login']);
        }
      });


  }
  ngOnInit() {
    var userData = JSON.parse(localStorage.getItem('currentUser')).token;
    this.userService.getUserProfile(userData._id)
      .subscribe(data => {
        this.userProfile = data;

      },
      error => {
        console.log(error);
      })
  }

  ngAfterViewInit() {


  }

}