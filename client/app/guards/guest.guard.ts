import { Injectable } from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//import { UserServices } from './users.services';
import { AuthenticationService, UserServices } from '../services/index';

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(private UserServices: UserServices, private router: Router) {}
  
  authenticated:any;
  test:any;
  
  canActivate() {
    
    var currentUserStr = localStorage.getItem('currentUser');
    var currentUser = JSON.parse(currentUserStr);
    if (currentUserStr) { //if user is there
      switch (currentUser.token.role) {
            case 'admin':
                this.router.navigate(['/admin']);
                break;
            case 'vendor':
                this.router.navigate(['/vendor']);
                break;
            case 'user':
                this.router.navigate(['/']);
                break;
            default:
                this.router.navigate(['/']);
                break;
        }
        return false;

    }

    return true;
     
  }
}