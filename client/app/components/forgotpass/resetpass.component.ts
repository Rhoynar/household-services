import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertService, AuthenticationService, UserServices } from '../../services/index';
import { CustomValidator } from '../../validators/custom.validator';

@Component({
    moduleId: module.id,
    selector: 'reset-pass',
    templateUrl: './resetpass.component.html'
    //styles: [main]
})
export class ResetPassComponent {


    public pagetitle = "Reset Password";

    public requestId: String;
    public changeReqDetails: any={};


    public resetPassForm: FormGroup;
    public customValidator = new CustomValidator(this.http);


    constructor(
        private http: Http,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,

        private UserServices: UserServices,
        private alertService: AlertService
    ) {
        let params: any = this.activatedRoute.snapshot.params;
        this.requestId = params.id;

        this.resetPassForm = this.fb.group({
            id: [this.requestId, Validators.required],
            userId: ['', Validators.required],
            userpass: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            retypeuserpass: ['', Validators.compose([Validators.required, this.customValidator.matches('userpass')])],
        });
    }

    ngOnInit() {
        this.UserServices.getForgotReq(this.requestId)
            .subscribe(data => {
                if (data.status == "success") {
                    this.changeReqDetails= data.result;
                    this.resetPassForm.controls['userId'].setValue(this.changeReqDetails.userId._id);
                } else {
                    
                    this.alertService.error(data.msg, 'forgotpass');
                }
                //this.router.navigate(['/confirmsignup/' + data.sort_msg]);
                //return false;
            },
            error => {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                this.alertService.error(errr.msg, 'forgotpass');
            }
            );
    }


    submitForm() {


        this.UserServices.resetPass(this.resetPassForm.value)
            .subscribe(data => {
                this.alertService.success(data.msg, 'forgotpass');

                //this.router.navigate(['/confirmsignup/' + data.sort_msg]);
                //return false;
            },
            error => {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                this.alertService.error(errr.msg, 'forgotpass');
            }
            );
    }




}