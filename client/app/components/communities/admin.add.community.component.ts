import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CommunityServices } from '../../services/index';
import { UserModel } from '../../models/models';
import { Http, Headers, Response } from '@angular/http';
import { CustomValidator } from '../../validators/custom.validator';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'admin-add-community',
  templateUrl: './admin.add.community.component.html'

})
export class AdminAddCommunityComponent implements AfterViewInit, OnInit, OnDestroy {

  
  loggedIn: any = false;
  
  
  addCommunityForm: FormGroup;
  customValidator = new CustomValidator(this.http);
  pagetitle="New Community";
  //constructor start
  constructor(
    private http: Http,
    private fb: FormBuilder,
    private router: Router,
    private communityServices: CommunityServices
    
  ) {

    this.addCommunityForm = this.fb.group({
      title: ['', Validators.required],
      addressLineOne: ['', Validators.required],
      addressLineTwo: [''],
      postcode: ['', Validators.required],
      phone: ['', Validators.required]
      
    });
    
  }
  //end of constructor

  

  

  //get vendors
  communityPage() {
    
    this.router.navigate(['/admin/community']);
  }

  

  submitForm(): void {
    
    

    this.communityServices.addCommunity(this.addCommunityForm.value)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);

        } else {
          alert(data.msg);
          this.communityPage();
        }

        //this.router.navigate(['/login']);
        //return false;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        
      }
      );
  }




  ngAfterViewInit() {
    
    

  }
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }
  }

  ngOnDestroy() {

  }

}