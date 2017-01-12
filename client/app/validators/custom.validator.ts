//import { Promise } from '@angular/forms';
import { FormControl } from '@angular/forms';

interface ValidationResult {
 [key:string]:boolean;
}

export class CustomValidator {
 
 static validEmail(control: FormControl): ValidationResult { 
     let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
//    if (control.value && control.value !="" && !isNaN(control.value.charAt(0)) ){
//      return { "startsWithNumber": true };
//    }

   return EMAIL_REGEXP.test(control.value) ? null : {
      validateEmail: true
    };
 
   //return null;

 }


 static usernameTaken(control: FormControl): Promise<ValidationResult> {
 
   let q = new Promise((resolve, reject) => {
     setTimeout(() => {
       
       if (control.value === "David") {
         console.log('sdsd')
         resolve({"usernameTaken": true});
       } else {
         console.log('d')
         resolve(null);
       }
     }, 1000)
   });
 
   return q;
 }
 
}