import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer, BehaviorSubject, Subject } from "rxjs/Rx";

import { AppSettings } from './appsettings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrderServices {
    constructor(private http: Http) {
    }


    getHeader() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }


    createOrder(orderDetails: any) {
        var headers = this.getHeader();
        return this.http.post('/api/createOrder', JSON.stringify(orderDetails), { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    getUserOrder() {
        var headers = this.getHeader();
        return this.http.get('/api/userOrder', { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    upcomingVendorOrder(){
        var headers = this.getHeader();
        return this.http.get('/api/upcomingVendorOrder', { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    getvendorOrder() {
        var headers = this.getHeader();
        return this.http.get('/api/vendorOrder', { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    getUpcomingUserOrder(){
        var headers = this.getHeader();
        return this.http.get('/api/upComingUserOrder', { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    getAllOrder() {
        var headers = this.getHeader();
        return this.http.get('/api/getAllOrder', { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
        //let body = error.json();
        //return Observable.throw(body || { });
    }
}