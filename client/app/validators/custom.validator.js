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
var CustomValidator = (function () {
    function CustomValidator(http) {
        this.http = http;
        this.matches = function (feildName) {
            return function (control) {
                //var num = +control.value;
                if (control.parent) {
                    if (control.value != control.parent.value[feildName]) {
                        return { matches: true };
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
                //return null;
            };
        };
    }
    CustomValidator.prototype.validEmail = function (control) {
        //let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return EMAIL_REGEXP.test(control.value) ? null : {
            validateEmail: true
        };
        //return null;
    };
    CustomValidator.prototype.emailTaken = function (control) {
        var _this = this;
        var q = new Promise(function (resolve, reject) {
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var userdata = {};
            userdata.email = control.value;
            if (control.parent) {
                //console.log(control.parent.value['id']);
                userdata.id = control.parent.value['id'];
            }
            _this.http.post('/api/checkUniqueEmail', JSON.stringify(userdata), { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.msg == 'available') {
                    resolve(null);
                }
                else {
                    resolve({ "emailTaken": true });
                }
            }, function (error) {
                console.log(error);
                resolve(null);
            });
        });
        return q;
    };
    CustomValidator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CustomValidator);
    return CustomValidator;
}());
exports.CustomValidator = CustomValidator;
//# sourceMappingURL=custom.validator.js.map