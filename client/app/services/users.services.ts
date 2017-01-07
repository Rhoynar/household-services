import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable() 
export class UserServices{
    constructor(private http:Http){
        console.log('User is initialised');

    }

    checkSession(){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://beta.cisin.com:3004/checksession',JSON.stringify({}),{headers:headers})
        .map(res=>res.json());
    }
    registerUser(newUser:any){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        //return this.http.post('http://localhost:3000/signup',JSON.stringify(newUser),{headers:headers})
        return this.http.post('http://beta.cisin.com:3004/signup',JSON.stringify(newUser),{headers:headers})
        //return this.http.post('http://localhost:3000/signup',JSON.stringify(newUser),{headers:headers})
        .map(res=>res.json());
    }

    loginUser(user:any){
        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://beta.cisin.com:3004/login',JSON.stringify(user),{headers:headers})
        .map(res=>res.json());
    }
}