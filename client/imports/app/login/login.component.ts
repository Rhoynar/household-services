import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Parties } from '../../../both/collections/parties.collection';
// import { Party } from '../../../both/models/party.model';
import template from './login.component.html';



@Component({
  selector: 'login',
  template
  //styles: [main]
})
export class LoginComponent implements AfterViewInit {
  // parties: Observable<any[]>;
 // parties: Observable<Party[]>;

  constructor() {
   // this.parties = Parties.find({}).zone();

  }

  ngAfterViewInit() {
        
    }

}