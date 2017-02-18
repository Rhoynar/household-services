import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'user-dashboard',
  templateUrl: './userDashboard.component.html'
  //styles: [main]
})
export class UserDashboardComponent {

  public pagetitle:String='Dashboard';
  constructor(
    private ngZone: NgZone,
    private router: Router
  ) {
  }

}