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
var CommunityServices = (function () {
    function CommunityServices(http) {
        this.http = http;
    }
    CommunityServices.prototype.getCommunities = function () {
        return this.http.get(appsettings_1.AppSettings.API_ENDPOINT + '/api/getAllCommunities')
            .map(this.extractData); //.catch(this.handleError);;
    };
    CommunityServices.prototype.getAllServices = function (communitySelection) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(appsettings_1.AppSettings.API_ENDPOINT + '/api/getAllServices', JSON.stringify(communitySelection), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    CommunityServices.prototype.getMyServices = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(appsettings_1.AppSettings.API_ENDPOINT + '/api/getMyServices', { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    CommunityServices.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    CommunityServices.prototype.handleError = function (error) {
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
    CommunityServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CommunityServices);
    return CommunityServices;
}());
exports.CommunityServices = CommunityServices;
//# sourceMappingURL=community.services.js.map