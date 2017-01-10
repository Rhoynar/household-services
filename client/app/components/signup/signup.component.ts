import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserServices } from '../../services/index'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: './signup.component.html',
  //styles: [main]
})
export class SignupComponent implements AfterViewInit {
  // parties: Observable<any[]>;
  // parties: Observable<Party[]>;
  users: Observable<any[]>;
  username: String;
  useremail: String;
  userpass: String;

  constructor(private router: Router, private UserServices: UserServices) {
    // this.parties = Parties.find({}).zone();

  }

  registerUser(event: any) {
    event.preventDefault();

    var newUser = {
      username: this.username,
      useremail: this.useremail,
      userpass: this.userpass,
    }
    this.UserServices.registerUser(newUser)
      .subscribe(data => {
        alert(data.msg);
        this.router.navigate(['/login']);
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
  ngAfterViewInit() {

  }

}