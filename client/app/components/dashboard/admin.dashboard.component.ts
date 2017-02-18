import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'admin-dashboard',
  templateUrl: './admin.dashboard.component.html'
  //styles: [main]
})
export class AdminDashboardComponent implements AfterViewInit {

  public pagetitle: any = "Dashboard";
  constructor() {


  }

  ngAfterViewInit() {


  }

}