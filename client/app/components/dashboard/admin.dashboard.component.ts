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
  // parties: Observable<any[]>;
  // parties: Observable<Party[]>;

  constructor() {
    // this.parties = Parties.find({}).zone();

  }

  ngAfterViewInit() {

    $(document).ready(function () {

      //$(".s-box").selectbox();
    });
  }

}