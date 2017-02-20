import {Injectable} from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Observer, BehaviorSubject,Subject} from "rxjs/Rx";
import { UserModel } from '../models/models';
import {AppSettings} from './appsettings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable() 
export class UserServices{
    constructor(private http:Http){
        console.log('User is initialised');

    }
    authenticated:any;
   
    getHeader(){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
    registerUser(newUser:any){
        // AppSettings.API_ENDPOINT+
        var headers=this.getHeader();
        return this.http.put('/api/user',JSON.stringify(newUser),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    registerVendor(newVendor:any){
        var headers=this.getHeader();
        return this.http.put('/api/vendor',JSON.stringify(newVendor),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    updateProfile(userProfile:UserModel){
        var headers=this.getHeader();
        return this.http.put('/api/profile',JSON.stringify(userProfile),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    loginUser(user:any){
        var headers=this.getHeader();
        return this.http.post('/login',JSON.stringify(user),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }


    getUserProfile(profileId:any){
        return this.http.get('/api/profile/'+profileId)
        .map(this.extractData);//.catch(this.handleError);;
    }

    getUserByRole(roleType:any){
        return this.http.get('/api/userbyrole/'+roleType)
        .map(this.extractData);//.catch(this.handleError);;
    }

    deleteUser(userId:any){
        return this.http.delete('/api/deleteuser/'+userId)
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