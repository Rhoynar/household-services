import { Component, ViewChild, ElementRef, AfterViewInit,OnChanges,OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserServices,AuthenticationService } from '../../services/index'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html'
  //styles: [main]
})
export class LoginComponent implements AfterViewInit,OnInit {
  // parties: Observable<any[]>;
  // parties: Observable<Party[]>;
  useremail: String;
  userpass: String;
  loading = false;
  error = '';
  
  constructor(private router: Router, 
    private UserServices: UserServices,
    private authenticationService: AuthenticationService) {
    // this.parties = Parties.find({}).zone();
   
  }

  ngAfterViewInit() {

  }
  
  ngOnInit() {
      // reset login status
      //this.authenticationService.logout();
  }

  loginUser(event: any) {
        this.loading = true;
        this.authenticationService.login(this.useremail, this.userpass)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }


  /*loginUser(event: any) {
    event.preventDefault();

    var user = {
      useremail: this.useremail,
      userpass: this.userpass,
    }

    this.UserServices.loginUser(user)
      .subscribe(
        data => {
          
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

  }*/

  


}