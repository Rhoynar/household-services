import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { FormControl, FormGroup } from '@angular/forms';
import {AppSettings} from '../services/appsettings';
import { Observable } from 'rxjs';
interface ValidationResult {
  [key: string]: boolean;
}
@Injectable()
export class CustomValidator {
  


  constructor(private http: Http) { }

  validEmail(control: FormControl): ValidationResult {
    //let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    return EMAIL_REGEXP.test(control.value) ? null : {
      validateEmail: true
    };
    //return null;
  }


  matches = (feildName:any) => {
  return (control:FormControl) => {
    //var num = +control.value;
    
    if (control.parent) {
        
        if(control.value!=control.parent.value[feildName]){
        
          return {matches: true};      
        }else{
          return null;  
        }
      }else{
        return null;
      }
    

    
    //return null;
  };
};

  emailTaken(control: FormControl): Promise<ValidationResult> {
    
    let q = new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var userdata: { email?: any, id?: any } = {};
      userdata.email = control.value;
      if (control.parent) {
        //console.log(control.parent.value['id']);
        userdata.id = control.parent.value['id'];
      }

      this.http.post('/api/checkUniqueEmail', JSON.stringify(userdata), { headers: headers })
        .map((res: Response) => res.json())
        .subscribe((data: any) => {
          if (data.msg == 'available') {
            resolve(null);
          } else {
            resolve({ "emailTaken": true });
          }
        },
        (error: any) => {
          console.log(error);
          resolve(null);
        })
      
    });

    return q;
  }

}