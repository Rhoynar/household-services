import { Component,Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'credit-card',
  templateUrl: './dashboard.component.html'
  //styles: [main]
})
export class CreditcardComponent {
  @Input()
  creditCard: {} ;

  constructor() {
  

  }

  

}