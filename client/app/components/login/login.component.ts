import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserServices } from '../../services/users.services'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html'
  //styles: [main]
})
export class LoginComponent implements AfterViewInit {
  // parties: Observable<any[]>;
  // parties: Observable<Party[]>;
  useremail: String;
  userpass: String;
  constructor(private router: Router, private UserServices: UserServices) {
    // this.parties = Parties.find({}).zone();

  }

  ngAfterViewInit() {

  }


  loginUser(event: any) {
    event.preventDefault();

    var user = {
      useremail: this.useremail,
      userpass: this.userpass,
    }
    this.UserServices.loginUser(user)
      .subscribe(data => {
        alert(data.msg);
        this.router.navigate(['/dashboard']);
        //return false;
      },
      error => {
        
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);
      }
      );
  }

}