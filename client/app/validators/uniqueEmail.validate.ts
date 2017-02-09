import {Injectable} from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Observer, BehaviorSubject,Subject} from "rxjs/Rx";
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';


interface IUsernameEmailValidator {
}

function checkUser(control: FormControl, source: string,http:Http) : Observable<IUsernameEmailValidator> {

  // Manually inject Http
  
 let API_ENDPOINT='http://ec2-54-165-12-165.compute-1.amazonaws.com:5000';
  // Return an observable with null if the
  // username or email doesn't yet exist, or
  // an objet with the rejetion reason if they do
  return new Observable((obs: any) => {
    control
      .valueChanges
      .debounceTime(400)
      .flatMap(value => http.post(API_ENDPOINT, JSON.stringify({ [source]: value })))
      .subscribe(
        data => {
          obs.next(null);
          obs.complete();
        },
        error => {
          let message = error.json().message;
          let reason:any;
          if (message === 'Username taken') {
            reason = 'usernameTaken';
          }
          if (message === 'Email taken') {
            reason = 'emailTaken';
          }
          obs.next({ [reason]: true });
          obs.complete();
        }
    );
  });
}

export class UsernameEmailValidator {

  constructor(private http:Http) {}

  static checkUsername(control: FormControl,http:Http) {
    return checkUser(control, 'username',http);
  }

  static checkEmail(control: FormControl,http:Http) {
    return checkUser(control, 'email',http);
  }
}