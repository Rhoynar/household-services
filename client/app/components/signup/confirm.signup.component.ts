import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router,ActivatedRoute, Params } from '@angular/router';

import { GooglePlaceService } from '../../services/index';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'confirm-home',
  templateUrl: './confirm.signup.component.html'
  //styles: [main]
})
export class ConfirmSignupComponent implements AfterViewInit, OnInit {

  

  public msgType: any = '';
  public searchControl: any = true;
  public searchValue: any = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    let params: any = this.activatedRoute.snapshot.params;
    this.msgType = params.type;
  }




  
      
      //this.router.navigate(['/package/search'], { queryParams: {zip:this.postal_code} });
  
  



  ngAfterViewInit() {

   
  }



  ngOnInit() {




  }


}