"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var Rx_1 = require("rxjs/Rx");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var UserServices = (function () {
    function UserServices(http) {
        this.http = http;
        console.log('User is initialised');
    }
    UserServices.prototype.isLoggedIn = function () {
        var _this = this;
        var subject = new Rx_1.Subject();
        subject.next(false);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get('http://beta.cisin.com:3004/isloggedin', { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log("next: returning true");
            subject.next(true);
            _this.authenticated = true;
            return true;
        }, function (error) {
            console.log("next: returning false");
            _this.authenticated = false;
            subject.next(false);
        });
        ; //.catch(this.handleError);
        return subject.asObservable().first();
    };
    UserServices.prototype.registerUser = function (newUser) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        //return this.http.post('http://localhost:3000/signup',JSON.stringify(newUser),{headers:headers})
        return this.http.post('http://beta.cisin.com:3004/signup', JSON.stringify(newUser), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.loginUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://beta.cisin.com:3004/login', JSON.stringify(user), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    UserServices.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
        //let body = error.json();
        //return Observable.throw(body || { });
    };
    UserServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserServices);
    return UserServices;
}());
exports.UserServices = UserServices;
//# sourceMappingURL=users.services.js.map