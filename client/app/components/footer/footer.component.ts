import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/index'

@Component({
  moduleId: module.id,
  selector: 'footer',
  templateUrl: './footer.component.html'
  //styles: [main]
})
export class FooterComponent {
  public loggedIn: any;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        if (currentUserStr) { //if user is there
            this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
    // this.authenticationService.generatetoken()
    //   .subscribe(
    //   result => {

    //     var currentUserStr = localStorage.getItem('currentUser');
    //     var currentUser = JSON.parse(currentUserStr);
    //     if (currentUserStr) { //if user is there
    //         this.loggedIn = true;
    //     } else {
    //       this.loggedIn = false;
    //     }

    //   }
    //   );
  }
}