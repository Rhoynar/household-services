import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertService,AuthenticationService } from '../../services/index';
import { CustomValidator } from '../../validators/custom.validator';

@Component({
  moduleId: module.id,
  selector: 'user-login',
  templateUrl: './userLogin.component.html'
  //styles: [main]
})
export class UserLoginComponent {


  pagetitle = "Login";

  
  loading = false;
  error = '';

  loginForm: FormGroup;
  customValidator = new CustomValidator(this.http);
  returnUrl: string;

  constructor(
    private http: Http,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {

  }

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();

    this.loginForm = this.fb.group({
      loginuseremail: ['', Validators.compose([this.customValidator.validEmail, Validators.required])],
      loginuserpass: ['', Validators.compose([Validators.required])],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

QueryStringToJSON(querystring:any) {            
    var pairs = querystring.split('&');
    
    var result = {};
    pairs.forEach(function(pair:any) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}

  loginUser() {
    this.loading = true;
    
        this.authenticationService.login(this.loginForm.value.loginuseremail, this.loginForm.value.loginuserpass)
            .subscribe(
                result => {
                if (result === true) {
                    var urlBlocks=this.returnUrl.split('?');
                    if(urlBlocks.length>1){
                        var params=this.QueryStringToJSON(urlBlocks[1]);
                        console.log(params);
                        this.router.navigate([urlBlocks[0]],{queryParams:params});
                    }else{
                        this.router.navigate([this.returnUrl]);
                    }
                    
                    
                    //this.router.navigate(['/dashboard']);
                } else {
                    this.error = 'Username or password is incorrect';
                    
                    this.loading = false;
                }
            }, error => {
                // In a real world app, we might use a remote logging infrastructure
                let errMsg: string;
                if (error instanceof Response) {
                    const body = error.json() || '';
                    const err = body.error || JSON.stringify(body);
                    //errMsg = `${error.status} - ${error.statusText || ''} ${body.msg}`;
                    errMsg=body.msg;
                } else {
                    errMsg = error.message ? error.message : error.toString();
                }
                
                this.alertService.error(errMsg,'login');
                
                //return Observable.throw(errMsg);
                //let body = error.json();
                //return Observable.throw(body || { });
            });

  }




}