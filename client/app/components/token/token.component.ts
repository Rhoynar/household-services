import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/index'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'token',
  template: '<div></div>'
  //styles: [main]
})
export class TokenComponent implements AfterViewInit {
  // parties: Observable<any[]>;
  // parties: Observable<Party[]>;
  loggedIn: any;
  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }

    // reset login status
    this.authenticationService.generatetoken()
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.router.navigate(['/login']);
                }
            });
      



  }

  ngAfterViewInit() {

    $(document).ready(function () {
      $(".s-box").selectbox();
    });
  }

  

}