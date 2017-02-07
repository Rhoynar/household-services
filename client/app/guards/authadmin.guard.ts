import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/index';

@Injectable()
export class AuthAdminGuard implements CanActivate {

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
                this.router.navigate(['/']);
                return false;
            }

        }
        // not logged in so redirect to login page
        this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}