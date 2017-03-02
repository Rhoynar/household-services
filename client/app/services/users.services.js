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
        console.log('User is initialised');
    }
    UserServices.prototype.getHeader = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    };
    UserServices.prototype.registerUser = function (newUser) {
        // AppSettings.API_ENDPOINT+
        var headers = this.getHeader();
        return this.http.put('/api/user', JSON.stringify(newUser), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.registerVendor = function (newVendor) {
        var headers = this.getHeader();
        return this.http.put('/api/vendor', JSON.stringify(newVendor), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.updateProfile = function (userProfile) {
        var headers = this.getHeader();
        return this.http.put('/api/profile', JSON.stringify(userProfile), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.loginUser = function (user) {
        var headers = this.getHeader();
        return this.http.post('/login', JSON.stringify(user), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.getUserProfile = function (profileId) {
        return this.http.get('/api/profile/' + profileId)
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.getUserByRole = function (roleType) {
        return this.http.get('/api/userbyrole/' + roleType)
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.getVendorByStatus = function (status) {
        return this.http.get('/api/vendorbystatus/' + status)
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.approveVendor = function (vendorDetails) {
        var headers = this.getHeader();
        return this.http.put('/api/approveVendor/', JSON.stringify(vendorDetails), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.deleteUser = function (userId) {
        return this.http.delete('/api/deleteuser/' + userId)
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.forgotPass = function (userData) {
        var headers = this.getHeader();
        return this.http.post('/api/forgotpass', JSON.stringify(userData), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    UserServices.prototype.getForgotReq = function (requestId) {
        return this.http.get('/api/forgotpass/' + requestId)
            .map(this.extractData); //.catch(this.handleError)
    };
    UserServices.prototype.resetPass = function (userData) {
        var headers = this.getHeader();
        return this.http.post('/api/resetpass', JSON.stringify(userData), { headers: headers })
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