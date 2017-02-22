import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertService, ServiceServices, UserServices } from '../../services/index';
import { CustomValidator } from '../../validators/custom.validator';

@Component({
    moduleId: module.id,
    selector: 'vendor-signup',
    templateUrl: './vendor.signup.component.html'
    //styles: [main]
})
export class VendorSignupComponent {


    public pagetitle = "Register Vendor";
    public serviceData: any;

    loading = false;
    error = '';

    vendorSignupForm: FormGroup;
    customValidator = new CustomValidator(this.http);


    constructor(
        private http: Http,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private UserServices: UserServices,
        private serviceServices: ServiceServices,
        private alertService: AlertService
    ) {
        this.createForm();
        this.getServiceAllType();
    }

    getServiceAllType() {

        this.serviceServices.getAllService()
            .subscribe(data => {
                if (data.status == "success") {
                    this.serviceData = data.result;

                    for (let s of data.result) {
                        //this.serviceData[s._id]=false;
                        this.addService(false);
                    }

                } else {
                    alert(data.msg);
                }



                

            },
            error => {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                alert(errr.msg);
                this.alertService.error(errr.msg, 'package-error');

            }
            );
    }

    createForm() {
        this.vendorSignupForm = this.fb.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            useremail: ['', Validators.compose([this.customValidator.validEmail, Validators.required]), Validators.composeAsync([this.customValidator.emailTaken.bind(this.customValidator)])],
            userpass: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            serviceList: this.fb.array([]),
        });
    }

    ngOnInit() {






    }

    initService(checked: boolean) {
        return this.fb.group({
            service: [checked, Validators.required]
        });
    }

    addService(serviceId: any) {
        var control: any = this.vendorSignupForm.controls['serviceList'];
        control.push(this.initService(serviceId));

    }

    registerVendor() {


        var checkedServices: any = [];
        var serviceListControls=this.vendorSignupForm.controls['serviceList'];
        for (let db in this.vendorSignupForm.controls['serviceList']['controls']) {
            if (this.vendorSignupForm.controls['serviceList']['controls'][db].value.service == true) {
                checkedServices.push(this.serviceData[db]._id)
            }
        }

        this.vendorSignupForm.value.serviceList = checkedServices;

        this.UserServices.registerVendor(this.vendorSignupForm.value)
            .subscribe(data => {
                this.alertService.success(data.msg, 'login');
                this.router.navigate(['/login']);
                //return false;
            },
            error => {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                this.alertService.error(errr.msg, 'signup');
            }
            );
    }




}