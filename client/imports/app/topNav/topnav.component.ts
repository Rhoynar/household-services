import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Parties } from '../../../both/collections/parties.collection';
// import { Party } from '../../../both/models/party.model';
import template from './topnav.component.html';



@Component({
  selector: 'topnav',
  template
  //styles: [main]
})
export class TopnavComponent {
  // parties: Observable<any[]>;
 // parties: Observable<Party[]>;

  constructor() {
   // this.parties = Parties.find({}).zone();

  }

}