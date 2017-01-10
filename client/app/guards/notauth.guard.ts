import { Injectable } from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//import { UserServices } from './users.services';
import { AuthenticationService, UserServices } from '../services/index';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(private UserServices: UserServices, private router: Router) {}
  
  authenticated:any;
  test:any;
  
  canActivate() {
    
     if (localStorage.getItem('currentUser')) {
            // logged in so return false, dont want to go there
            this.router.navigate(['/dashboard']);
            return false;
        }
        // not logged in so redirect to login page
        
        return true;
  }
}