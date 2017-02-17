import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'top-header',
  templateUrl: './header.component.html'
  //styles: [main]
})
export class HeaderComponent {
  constructor(
    private router: Router,

  ) {
  }
}