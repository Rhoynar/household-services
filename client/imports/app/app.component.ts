import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Parties } from '../../../both/collections/parties.collection';
import { Party } from '../../../both/models/party.model';
import template from './app.component.html';
import bootrapStyle from '../css/bootstrap.scss';
import style from '../css/style.scss';
import responsive from '../css/responsive.scss';
import fontawesome from '../css/font-awesome.scss';
import jqueryselectbox from '../css/jquery.selectbox.scss';
import owlcarousel from '../css/owl.carousel.scss';
import owltransitions from '../css/owl.transitions.scss';


@Component({
  selector: 'app',
  template,
  styles: [ bootrapStyle,style,responsive,fontawesome,jqueryselectbox,owlcarousel,owltransitions ]
})
export class AppComponent {
  // parties: Observable<any[]>;
  parties: Observable<Party[]>;

  constructor() {
    this.parties = Parties.find({}).zone();

  }

}