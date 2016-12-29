import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Parties } from '../../../both/collections/parties.collection';
// import { Party } from '../../../both/models/party.model';
import template from './landing.component.html';



@Component({
  selector: 'landing',
  template
  //styles: [main]
})
export class LandingComponent {
  // parties: Observable<any[]>;
 // parties: Observable<Party[]>;

  constructor() {
   // this.parties = Parties.find({}).zone();

  }

}