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
var StripeServices = (function () {
    function StripeServices(http) {
        this.http = http;
    }
    StripeServices.prototype.getHeader = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    };
    StripeServices.prototype.postCardDetails = function (cardDetails) {
        var headers = this.getHeader();
        return this.http.post(appsettings_1.AppSettings.API_ENDPOINT + '/api/createStripeCust', JSON.stringify(cardDetails), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    StripeServices.prototype.postCardAndServiceDetails = function (cardDetails, selectedService) {
        var headers = this.getHeader();
        return this.http.post(appsettings_1.AppSettings.API_ENDPOINT + '/api/addandcreateCharges', JSON.stringify({ cardDetails: cardDetails, selectedService: selectedService }), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    StripeServices.prototype.getCards = function () {
        var headers = this.getHeader();
        return this.http.get(appsettings_1.AppSettings.API_ENDPOINT + '/api/getStripeCard', { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    StripeServices.prototype.deleteCards = function (sourceJson) {
        var headers = this.getHeader();
        return this.http.post(appsettings_1.AppSettings.API_ENDPOINT + '/api/deleteCards', JSON.stringify(sourceJson), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    StripeServices.prototype.getUserProfile = function (profileId) {
        // var headers=new Headers();
        // headers.append('Content-Type', 'application/json');
        return this.http.get(appsettings_1.AppSettings.API_ENDPOINT + '/api/getprofile/' + profileId)
            .map(this.extractData); //.catch(this.handleError);;
    };
    StripeServices.prototype.createServiceCharge = function (cardDetails, selectedService) {
        var headers = this.getHeader();
        return this.http.post(appsettings_1.AppSettings.API_ENDPOINT + '/api/createCharges', JSON.stringify({ cardDetails: cardDetails, selectedService: selectedService }), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    StripeServices.prototype.payPackageWithCard = function (cardDetails, selectedService, isNewCard, doSave) {
        var headers = this.getHeader();
        return this.http.post(appsettings_1.AppSettings.API_ENDPOINT + '/api/createPackageCharges', JSON.stringify({ cardDetails: cardDetails, selectedService: selectedService, isNewCard: isNewCard, doSave: doSave }), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    StripeServices.prototype.payPackageWithToken = function (cardDetails, selectedService) {
        var headers = this.getHeader();
        return this.http.post(appsettings_1.AppSettings.API_ENDPOINT + '/api/payPackageWithToken', JSON.stringify({ cardDetails: cardDetails, selectedService: selectedService }), { headers: headers })
            .map(this.extractData); //.catch(this.handleError);;
    };
    StripeServices.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    StripeServices.prototype.handleError = function (error) {
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
    StripeServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], StripeServices);
    return StripeServices;
}());
exports.StripeServices = StripeServices;
//# sourceMappingURL=stripe.services.js.map