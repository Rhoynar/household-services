import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';



@Injectable()
export class AdminLoginGuard implements CanActivate {

    constructor(
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        var currentUserStr = localStorage.getItem('currentUser')
        var currentUser = JSON.parse(currentUserStr);
        if (currentUserStr) { //if user is there
            if (currentUser.token.role == "admin") {  //if current user is admin
                return true;
            } else { //if user is there , but not admin redirect to landing page
                switch (currentUser.token.role) {
                    case 'admin':
                        this.router.navigate(['/admin']);
                        break;
                    case 'vendor':
                        this.router.navigate(['/vendor']);
                        break;
                    case 'user':
                        
                        this.router.navigate(['/dashboard']);
                        break;
                    default:
                        this.router.navigate(['/']);
                        break;
                }
                return false;
            }

        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}