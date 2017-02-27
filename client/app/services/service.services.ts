import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer, BehaviorSubject, Subject } from "rxjs/Rx";
import { ServiceModel } from '../models/models';
import { AppSettings } from './appsettings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServiceServices {
    constructor(private http: Http) {
        console.log('User is initialised');

    }

    getHeader() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    getAllService() {
        var headers = this.getHeader();
        return this.http.get('/api/service', { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    getServiceByid(serviceId:String){
        var headers = this.getHeader();
        return this.http.get('/api/service/'+serviceId, { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    addService(serviceDetails:any){
        var headers = this.getHeader();
        return this.http.post('/api/service', JSON.stringify(serviceDetails), { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    updateService(serviceDetails:any){
        var headers = this.getHeader();
        return this.http.put('/api/service', JSON.stringify(serviceDetails), { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    deleteService(serviceId:String) {
        var headers = this.getHeader();
        return this.http.delete('/api/service/'+serviceId, { headers: headers })
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
        console.error(errMsg);
        return Observable.throw(errMsg);
        //let body = error.json();
        //return Observable.throw(body || { });
    }
}