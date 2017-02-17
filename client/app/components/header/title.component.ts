import { Component,Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'page-title',
  templateUrl: './title.component.html'
  //styles: [main]
})
export class PageTitleComponent {

  @Input()
  pagetitle: String = "";

  constructor(
    private router: Router,

  ) {

  }


}