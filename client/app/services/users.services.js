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
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var UserServices = (function () {
    function UserServices(http) {
        this.http = http;
        this.API_ENDPOINT = 'http://beta.cisin.com:3004';
        console.log('User is initialised');
    }
    UserServices.prototype.registerUser = function (newUser) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.API_ENDPOINT + '/signup', JSON.stringify(newUser), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.updateProfile = function (userProfile) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.API_ENDPOINT + '/api/updateProfile', JSON.stringify(userProfile), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.loginUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.API_ENDPOINT + '/login', JSON.stringify(user), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.getUserProfile = function (profileId) {
        // var headers=new Headers();
        // headers.append('Content-Type', 'application/json');
        return this.http.get(this.API_ENDPOINT + '/api/getprofile/' + profileId)
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