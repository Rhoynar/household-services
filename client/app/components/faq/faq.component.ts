import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AlertService, AuthenticationService, OrderServices } from '../../services/index';


@Component({
  moduleId: module.id,
  selector: 'faq',
  templateUrl: './faq.component.html'
  //styles: [main]
})
export class FaqComponent {

  public pagetitle: String = 'FAQS';
  
  constructor(
    
    private ngZone: NgZone,
    private router: Router
  ) {
    
  }

  



}