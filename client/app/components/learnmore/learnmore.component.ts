import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertService,AuthenticationService } from '../../services/index';
import { CustomValidator } from '../../validators/custom.validator';

@Component({
  moduleId: module.id,
  selector: 'learn-more',
  templateUrl: './learnmore.component.html'
  //styles: [main]
})
export class LearnMoreComponent {


  pagetitle = "Learn More";

  
  

  constructor(
  
  ) {

  }

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();

  
  }





}