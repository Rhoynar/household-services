import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $:any;



@Component({
  moduleId:module.id,
  selector: 'landing',
  templateUrl:'./landing.component.html'
  //styles: [main]
})
export class LandingComponent implements AfterViewInit {
  // parties: Observable<any[]>;
 // parties: Observable<Party[]>;

  constructor() {
   // this.parties = Parties.find({}).zone();

  }

  ngAfterViewInit() {
        
        $(document).ready(function () {
        	$("#owl-demo").owlCarousel({    
		    autoPlay: 3000, //Set AutoPlay to 3 seconds
		    items : 1,
		    itemsDesktop : [1199,1],
		    itemsDesktopSmall : [979,1],
			itemsTablet : [768,1],
			navigation :false,
			pagination:false,
			slideSpeed : 300,
		    paginationSpeed : 400,
			navigationText:	["<i class='fa fa-angle-left' aria-hidden='true'></i>","<i class='fa fa-angle-right' aria-hidden='true'></i>"],
			transitionStyle : "fade",
		    });
			//$(".s-box").selectbox();
		});
    }

}