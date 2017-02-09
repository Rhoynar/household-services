import {Injectable} from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Observer, BehaviorSubject,Subject} from "rxjs/Rx";
import { ProfileModel } from '../models/profile.model';
import {AppSettings} from './appsettings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable() 
export class UserServices{
    constructor(private http:Http){
        console.log('User is initialised');

    }
    authenticated:any;
   
    
    registerUser(newUser:any){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(AppSettings.API_ENDPOINT+'/signup',JSON.stringify(newUser),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    updateProfile(userProfile:ProfileModel){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(AppSettings.API_ENDPOINT+'/api/updateProfile',JSON.stringify(userProfile),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    loginUser(user:any){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(AppSettings.API_ENDPOINT+'/login',JSON.stringify(user),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }


    getUserProfile(profileId:any){
        // var headers=new Headers();
        // headers.append('Content-Type', 'application/json');
        return this.http.get(AppSettings.API_ENDPOINT+'/api/getprofile/'+profileId)
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