import { Component, OnInit,Input } from '@angular/core';

import { AlertService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;
    @Input() alertType: String = '';
    
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(
          message => { 
            this.message = message; 
          }
        );
    }

    closeAlert(){
        this.message={};
    }
}