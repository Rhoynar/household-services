import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer, BehaviorSubject, Subject } from "rxjs/Rx";
import { PackageModel } from '../models/package.model'
import {AppSettings} from './appsettings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PackageServices {
    constructor(private http: Http) {
    }

    
    getHeader(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
    getAllPackage() {
        return this.http.get(AppSettings.API_ENDPOINT+'/api/getAllPackage')
            .map(this.extractData);//.catch(this.handleError);;
    }

    addPackage(packageDetails:PackageModel){
        var headers=this.getHeader();
        return this.http.post(AppSettings.API_ENDPOINT+'/api/addPackage',JSON.stringify(packageDetails),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    updatePackage(packageDetails:PackageModel){
        var headers=this.getHeader();
        return this.http.post(AppSettings.API_ENDPOINT+'/api/updatePackage',JSON.stringify(packageDetails),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    getPackageByZipcode(postalCode: any) {
        var headers=this.getHeader();

        return this.http.post(AppSettings.API_ENDPOINT+'/api/getPackageByZipcode', JSON.stringify({ 'postalCode': postalCode, 'frequency': 'monthly' }), { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    getPackageByid(packageId: any) {
        var headers=this.getHeader();
        return this.http.post(AppSettings.API_ENDPOINT+'/api/getPackageByid', JSON.stringify({ 'packageId': packageId }), { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    deletePackageByid(packageId: any) {
        var headers=this.getHeader();
        return this.http.delete(AppSettings.API_ENDPOINT+'/api/package/'+packageId,  { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }


    getAllAdminPackageDeals() {
        return this.http.get(AppSettings.API_ENDPOINT+'/api/getAllPackageDeals')
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