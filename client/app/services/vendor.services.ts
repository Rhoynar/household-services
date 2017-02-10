import {Injectable} from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Observer, BehaviorSubject,Subject} from "rxjs/Rx";
import { VendorModel } from '../models/vendor.model';
import {AppSettings} from './appsettings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable() 
export class VendorServices{
    constructor(private http:Http){

    }
    authenticated:any;
   
   getHeader(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
    
    getAllVendors(){
        return this.http.get(AppSettings.API_ENDPOINT+'/api/getAllVendors')
        .map(this.extractData);//.catch(this.handleError);;
    }

    
    addvendors(vendorProfile:VendorModel){
        var headers=this.getHeader();
        return this.http.post(AppSettings.API_ENDPOINT+'/api/vendor',JSON.stringify(vendorProfile),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    updateVendors(vendorDetails:VendorModel){
        var headers=this.getHeader();
        return this.http.put(AppSettings.API_ENDPOINT+'/api/vendor',JSON.stringify(vendorDetails ),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    getVendorByid(vendorId: any) {
        var headers=this.getHeader();
        return this.http.get(AppSettings.API_ENDPOINT+'/api/vendor/'+vendorId, { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    deleteVendorByid(vendorId: any) {
        var headers=this.getHeader();
        return this.http.delete(AppSettings.API_ENDPOINT+'/api/vendor/'+vendorId,  { headers: headers })
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