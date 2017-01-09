import {Injectable} from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Observer, BehaviorSubject,Subject} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable() 
export class UserServices{
    constructor(private http:Http){
        console.log('User is initialised');

    }
    authenticated:any;
   

    isLoggedIn() :Observable<boolean>{
        var subject = new Subject<boolean>();
        subject.next(false);
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get('http://beta.cisin.com:3004/isloggedin',{headers:headers})
        //.map(this.extractData)
         .map((res : Response) => res.json())
        .subscribe(
        (data) => {
            console.log("next: returning true");
          subject.next(true);
          this.authenticated=true;
          return true;
        },
        (error) => {
             console.log("next: returning false");
          this.authenticated=false;
          subject.next(false);
        }
      );;//.catch(this.handleError);
        return subject.asObservable().first();
    }

    registerUser(newUser:any){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        //return this.http.post('http://localhost:3000/signup',JSON.stringify(newUser),{headers:headers})
        return this.http.post('http://beta.cisin.com:3004/signup',JSON.stringify(newUser),{headers:headers})
        //return this.http.post('http://localhost:3000/signup',JSON.stringify(newUser),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    loginUser(user:any){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://beta.cisin.com:3004/login',JSON.stringify(user),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }


     private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
        //let body = error.json();
        //return Observable.throw(body || { });
    }
}