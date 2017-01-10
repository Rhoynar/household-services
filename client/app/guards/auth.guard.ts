import { Injectable } from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//import { UserServices } from './users.services';
import { AuthenticationService, UserServices } from '../services/index';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private UserServices: UserServices, private router: Router) {}
  
  authenticated:any;
  test:any;
  
  canActivate() {
    
     if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;


    //  this.test=this.UserServices.isLoggedIn()
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //       this.authenticated=data;
    //       return true;
    //     },
    //     error => {
    //       //let errMsg: string;
    //       this.authenticated=false;
    //         //this.router.navigate(['/login']);
    //     }
    //   );
      
    //   console.log(this.test);
    //   // this.router.navigate(['/login']);
    //   // return false;
    //   // console.log(this.test);
    //   // console.log(this.authenticated);
    //   // alert('sd');
      
    //   if (this.authenticated==false) {
    //         // not logged in so redirect to login page with the return url
    //        // this.router.navigate(['/login']);
    //         return false;
    //     }else{
    //       // logged in so return true
    //       return true;
    //     }
 
        
  }
}