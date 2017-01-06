import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $:any;



@Component({
  moduleId:module.id,
  selector: 'packages',
  templateUrl:'./packages.component.html'
  //styles: [main]
})
export class PackagesComponent implements AfterViewInit {
  // parties: Observable<any[]>;
 // parties: Observable<Party[]>;

  constructor() {
   // this.parties = Parties.find({}).zone();

  }

  ngAfterViewInit() {
      $(document).ready(function () {
          	
    		$(".s-box").selectbox();
    	});
    }

}