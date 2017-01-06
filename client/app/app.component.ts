import { Component } from '@angular/core';
import { UserServices } from './services/users.services';
@Component({
    moduleId:module.id,
    selector: 'app',
    templateUrl: 'app.component.html',
    providers:[UserServices]
})
export class AppComponent { name = 'Angular'; }