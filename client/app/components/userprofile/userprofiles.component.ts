import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $:any;



@Component({
  moduleId:module.id,
  selector: 'userprofile',
  templateUrl:'./userprofiles.component.html'
  //styles: [main]
})
export class UserprofileComponent implements AfterViewInit {
 
  constructor() {
   // this.parties = Parties.find({}).zone();
   JSON.parse
   console.log(JSON.parse(localStorage.getItem('currentUser')).token._id);
  }

  ngAfterViewInit() {
        
      $(document).ready(function () {
			 $(".s-box").selectbox();
		  });
    }

}