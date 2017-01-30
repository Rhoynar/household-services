import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, CommunityServices } from '../../services/index'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'topnav-one',
  templateUrl: './topnavone.component.html',
  //inputs: ['communityId','communityName']
  //styles: [main]
})
export class TopnavOneComponent implements AfterViewInit {




  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private communityService: CommunityServices) {

  }





  ngAfterViewInit() {

  }



}