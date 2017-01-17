import { Component, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StripeServices } from '../../services/index';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'stripe-payments',
  templateUrl: './stripe.component.html'
  //styles: [main]
})
export class StripesComponent {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;
  stripeCards:any;
  constructor(private _zone: NgZone, private stripeServices: StripeServices) { 

    this.getCards();
  }

  getCards(){
    this.stripeServices.getCards()
      .subscribe(data => {
        if (data.status == 'error') {
          console.log(data.msg);

        } else {
          
          this.stripeCards=data.result;
        }

        //this.router.navigate(['/login']);
        //return false;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);
      }
      );
  }

  getToken() {

    this.stripeServices.postCardDetails({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    })
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);

        } else {
          alert(data.msg);

        }
        this.getCards();
        //this.router.navigate(['/login']);
        //return false;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);
      }
      );
    /*this.message = 'Loading...';

    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {
      console.log(response);
      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          this.message = `Success! Card token ${response.card.id}.`;
        } else {
          this.message = response.error.message;
        }
      });
    });*/
  }
}


