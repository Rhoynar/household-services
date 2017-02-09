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
var appsettings_1 = require('./appsettings');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var PackageServices = (function () {
    function PackageServices(http) {
        this.http = http;
    }
    PackageServices.prototype.getHeader = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    };
    PackageServices.prototype.getAllPackage = function () {
        return this.http.get(appsettings_1.AppSettings.API_ENDPOINT + '/api/getAllPackage')
            .map(this.extractData); //.catch(this.handleError);;
    };
    PackageServices.prototype.addPackage = function (packageDetails) {
        var headers = this.getHeader();
        return this.http.post(appsettings_1.AppSettings.API_ENDPOINT + '/api/addPackage', JSON.stringify(packageDetails), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    PackageServices.prototype.getPackageByZipcode = function (postalCode) {
        var headers = this.getHeader();
        return this.http.post(appsettings_1.AppSettings.API_ENDPOINT + '/api/getPackageByZipcode', JSON.stringify({ 'postalCode': postalCode, 'frequency': 'monthly' }), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    PackageServices.prototype.getPackageByid = function (packageId) {
        var headers = this.getHeader();
        return this.http.post(appsettings_1.AppSettings.API_ENDPOINT + '/api/getPackageByid', JSON.stringify({ 'packageId': packageId }), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    PackageServices.prototype.deletePackageByid = function (packageId) {
        var headers = this.getHeader();
        return this.http.delete(appsettings_1.AppSettings.API_ENDPOINT + '/api/package/' + packageId, { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    PackageServices.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    PackageServices.prototype.handleError = function (error) {
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
    PackageServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PackageServices);
    return PackageServices;
}());
exports.PackageServices = PackageServices;
//# sourceMappingURL=package.services.js.map