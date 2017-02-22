import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    getHeader(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    login(username: String, password: String): Observable<boolean> {
        var headers=this.getHeader();
        
        return this.http.post('/api/authenticate', JSON.stringify({ useremail: username, userpass: password }), { headers: headers })
            //return this.http.post('/login', JSON.stringify({ useremail: username, userpass: password }),{headers:headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ useremail: username, token: token }));
                    
                    // return true to indicate successful login
                    return true;
                } else {
                    
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    adminLogin(username: String, password: String): Observable<boolean> {
        var headers=this.getHeader();
        return this.http.post('/admin/login', JSON.stringify({ useremail: username, userpass: password }), { headers: headers })
            //return this.http.post('/login', JSON.stringify({ useremail: username, userpass: password }),{headers:headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    console.log({ useremail: username, token: token });
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ useremail: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout() {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');

        var headers=this.getHeader();
        return this.http.get('/logout', { headers: headers })
            .map((res: Response) => res.json());

    }

    generatetoken(): Observable<boolean> {
        var headers=this.getHeader();
        return this.http.get('/api/createtoken')
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;

                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ useremail: token.email, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    localStorage.removeItem('currentUser');
                    return false;
                }
            });
    }
}