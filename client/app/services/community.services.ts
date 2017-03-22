import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer, BehaviorSubject, Subject } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommunityServices {
    constructor(private http: Http) {
    }

    
    getHeader(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    addCommunity(packageDetails:any){
        var headers=this.getHeader();
        return this.http.post('/api/addCommunity',JSON.stringify(packageDetails),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }
    
    getAllCommunity() {
        return this.http.get('/api/getAllCommunity')
            .map(this.extractData);//.catch(this.handleError);;
    }

    deleteCommunityByid(communityId: any) {
        var headers=this.getHeader();
        return this.http.delete('/api/community/'+communityId,  { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    getCommunityByid(communityId: any) {
        var headers=this.getHeader();
        return this.http.get('/api/community/'+communityId,  { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    updateCommunity(communityDetails:any){
         //var headers = new Headers();
         //headers.append('Content-Type', 'multipart/form-data');
         //headers.append('Accept', 'application/json');
        var headers=this.getHeader();
        return this.http.post('/api/updateCommunity',JSON.stringify(communityDetails),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

    getCommunityCalender(){
        var headers=this.getHeader();
        return this.http.get('/api/getCommunityCalender',  { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;    
    }

    getCommunityByZipCode(zipcode:any){
        var headers=this.getHeader();
        return this.http.get('/api/getCommunityByZipCode/'+zipcode,  { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;    
    }

    getZipAddress(zipcode:any){
        //var headers=this.getHeader();
        var headers = new Headers();
        return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?address='+zipcode+'&result_type=postal_code&sensor=true',  { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;    
    }

    addServiceDemand(packageDetails:any){
        var headers=this.getHeader();
        return this.http.post('/api/addServiceDemand',JSON.stringify(packageDetails),{headers:headers})
        .map(this.extractData);//.catch(this.handleError);;
    }

   /* 

    

    

    getPackageByZipcode(postalCode: any) {
        var headers=this.getHeader();

        return this.http.post('/api/getPackageByZipcode', JSON.stringify({ 'postalCode': postalCode, 'frequency': 'monthly' }), { headers: headers })
            .map(this.extractData);//.catch(this.handleError);;
    }

    

    


    getAllAdminPackageOrders() {
        return this.http.get('/api/getAllPackageOrders')
            .map(this.extractData);//.catch(this.handleError);;
}*/





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