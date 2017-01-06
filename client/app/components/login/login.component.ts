import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserServices } from '../../services/users.services'
declare var $:any;



@Component({
  moduleId:module.id,
  selector: 'login',
  templateUrl:'./login.component.html'
  //styles: [main]
})
export class LoginComponent implements AfterViewInit {
  // parties: Observable<any[]>;
 // parties: Observable<Party[]>;

  constructor( private UserServices:UserServices) {
   // this.parties = Parties.find({}).zone();

  }

  ngAfterViewInit() {
        
    }

}