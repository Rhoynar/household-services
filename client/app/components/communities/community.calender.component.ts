import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CommunityServices, AlertService } from '../../services/index';



@Component({
  moduleId: module.id,
  selector: 'community-calender',
  templateUrl: './community.calender.component.html'
  //styles: [main]
})
export class CommunityCalenderComponent implements AfterViewInit {
  communityCalender: any =[];

  //constructor start
  constructor(
    private router: Router,
    private communityServices: CommunityServices,
    private alertService: AlertService
  ) {

    this.getAllCommunity();
  }
  //end of constructor

  //get packages
  getAllCommunity() {
    this.communityServices.getCommunityCalender()
      .subscribe(data => {
        this.communityCalender = data.result;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );
  }


  ngAfterViewInit() {
    

  }
  ngOnInit() {
    
  }

  ngOnDestroy() {

  }

}