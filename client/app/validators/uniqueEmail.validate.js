"use strict";
var Observable_1 = require('rxjs/Observable');
require('rxjs/Rx');
function checkUser(control, source, http) {
    // Manually inject Http
    var API_ENDPOINT = 'http://ec2-54-165-12-165.compute-1.amazonaws.com:5000';
    // Return an observable with null if the
    // username or email doesn't yet exist, or
    // an objet with the rejetion reason if they do
    return new Observable_1.Observable(function (obs) {
        control
            .valueChanges
            .debounceTime(400)
            .flatMap(function (value) { return http.post(API_ENDPOINT, JSON.stringify((_a = {}, _a[source] = value, _a))); var _a; })
            .subscribe(function (data) {
            obs.next(null);
            obs.complete();
        }, function (error) {
            var message = error.json().message;
            var reason;
            if (message === 'Username taken') {
                reason = 'usernameTaken';
            }
            if (message === 'Email taken') {
                reason = 'emailTaken';
            }
            obs.next((_a = {}, _a[reason] = true, _a));
            obs.complete();
            var _a;
        });
    });
}
var UsernameEmailValidator = (function () {
    function UsernameEmailValidator(http) {
        this.http = http;
    }
    UsernameEmailValidator.checkUsername = function (control, http) {
        return checkUser(control, 'username', http);
    };
    UsernameEmailValidator.checkEmail = function (control, http) {
        return checkUser(control, 'email', http);
    };
    return UsernameEmailValidator;
}());
exports.UsernameEmailValidator = UsernameEmailValidator;
//# sourceMappingURL=uniqueEmail.validate.js.map