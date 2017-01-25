import {Injectable} from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Observer, BehaviorSubject,Subject} from "rxjs/Rx";
import { ProfileModel } from '../models/profile.model'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable() 
export class StripeServices{
    constructor(private http:Http){
    }

   API_ENDPOINT='http://beta.cisin.com:3004';
    
    postCardDetails(cardDetails:any){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.API_ENDPOINT+'/api/createStripeCust',JSON.stringify(cardDetails),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    postCardAndServiceDetails(cardDetails:any,selectedService:any){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.API_ENDPOINT+'/api/addandcreateCharges',JSON.stringify({cardDetails:cardDetails,selectedService:selectedService}),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;

    }

    getCards(){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.API_ENDPOINT+'/api/getStripeCard',{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    deleteCards(sourceJson:any){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.API_ENDPOINT+'/api/deleteCards',JSON.stringify(sourceJson),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }


    getUserProfile(profileId:any){
        // var headers=new Headers();
        // headers.append('Content-Type', 'application/json');
        return this.http.get(this.API_ENDPOINT+'/api/getprofile/'+profileId)
        .map(this.extractData);//.catch(this.handleError);;
    }

    createServiceCharge(cardDetails:any,selectedService:any){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.API_ENDPOINT+'/api/createCharges',JSON.stringify({cardDetails:cardDetails,selectedService:selectedService}),{headers:headers})
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