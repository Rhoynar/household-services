import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $:any;



@Component({
  moduleId:module.id,
  selector: 'footer-section',
  templateUrl:'./footer-section.component.html'
  //styles: [main]
})
export class footerSectionComponent {
  // parties: Observable<any[]>;
 // parties: Observable<Party[]>;

  constructor() {
   // this.parties = Parties.find({}).zone();

  }

}