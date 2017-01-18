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
  stripeCustomerId: string = '';

  message: string;
  stripeCards: any = [];
  cardListVisibility: any = true; //hidden
  cardFormVisibility: any = true; //hidden

  constructor(private _zone: NgZone, private stripeServices: StripeServices) {

    this.getCards();
  }

  showCardForm() {
    this.cardFormVisibility = false; //shown 
  }

  deleteCard(cardId: String) {
    var sourceJson = { customerId: this.stripeCustomerId, cardId: cardId };

    this.stripeServices.deleteCards(sourceJson).subscribe(data => {
      if (data.status == 'error') {
        alert(data.msg);
      } else {
        alert(data.msg);
      }
      this.getCards();
    },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);
      });
  }
  getCards() {
    this.stripeServices.getCards()
      .subscribe(data => {

        this.stripeCustomerId = data.stripe_cus_id;
        this.stripeCards = data.result;
        if (this.stripeCards.length > 0) {
          this.cardListVisibility = false; //shown
          this.cardFormVisibility = true;
        } else {
          this.cardListVisibility = true;  //hidden
          this.cardFormVisibility = false; //shown 
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


  keys(values: any): Array<string> {
    return Object.keys(values);
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


