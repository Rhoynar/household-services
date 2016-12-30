import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Parties } from '../../../both/collections/parties.collection';
// import { Party } from '../../../both/models/party.model';
import { $ } from 'meteor/jquery';
import template from './topnav.component.html';



@Component({
  selector: 'topnav',
  template
  //styles: [main]
})
export class TopnavComponent implements AfterViewInit {
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