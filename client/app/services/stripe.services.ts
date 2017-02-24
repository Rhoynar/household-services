import {Injectable} from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Observer, BehaviorSubject,Subject} from "rxjs/Rx";
import {AppSettings} from './appsettings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable() 
export class StripeServices{
    constructor(private http:Http){
    }

   getHeader(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

makePayment(cardDetails:any,orderDetails:any,newCard:any,saveCard:any){
        var headers=this.getHeader();
        return this.http.post('/api/makePayment',JSON.stringify({cardDetails:cardDetails,orderDetails:orderDetails,newCard:newCard,saveCard:saveCard}),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    payFromExistingCard(cardDetails:any,orderDetails:any){
        var headers=this.getHeader();
        return this.http.post('/api/payFromExistingCard',JSON.stringify({cardDetails:cardDetails,orderDetails:orderDetails}),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    payWithNewCard(cardDetails:any,orderDetails:any){
        var headers=this.getHeader();
        return this.http.post('/api/payWithNewCard',JSON.stringify({cardDetails:cardDetails,orderDetails:orderDetails}),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }
    
    getCards(){
        var headers=this.getHeader();
        return this.http.get('/api/getUserStripeCard',{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    deleteCards(sourceJson:any){
        var headers=this.getHeader();
        return this.http.post('/api/deleteCards',JSON.stringify(sourceJson),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }


    getUserProfile(profileId:any){
        // var headers=new Headers();
        // headers.append('Content-Type', 'application/json');
        return this.http.get('/api/getprofile/'+profileId)
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