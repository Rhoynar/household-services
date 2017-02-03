import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
declare var $: any;
import { StripeServices, PackageServices } from '../../services/index';



@Component({
  moduleId: module.id,
  selector: 'package-purchase',
  templateUrl: './packagepurchase.component.html'
  //styles: [main]
})
export class PackagePurchaseComponent implements OnInit, AfterViewInit {

  stripeCards: any = [];
  stripeCustomerId: string = '';
  packageId: string = '';
  packageDetails: any = {};
  useCardId: any = '';

  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stripeServices: StripeServices,
    private packageServices: PackageServices,
    private router: Router
  ) {
    let params: any = this.activatedRoute.snapshot.params;
    this.packageId = params.id;

    this.packageServices.getPackageByid(this.packageId)
      .subscribe(data => {
        if (data.status == "success") {
          this.packageDetails = data.result;
        } else {
          alert(data.msg);
        }

      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );

    this.getCards();

  }


  makePayment(cardDetails: any) {

    var con = confirm('Are you Sure, you wanna make this payment?');
    if (con) {
      var isNewCard = 'no';
      var doSave = 'no';
      this.stripeServices.payPackageWithCard(cardDetails, this.packageDetails, isNewCard, doSave)
        .subscribe(data => {
          alert(data.msg);
          //this.router.navigate(['/deals']);
        },
        error => {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          var errr = JSON.parse(err);
          alert(errr.msg);
        }
        );
    }
  }

  payWithCard() {
    this.stripeServices.payPackageWithToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc,
    }, this.packageDetails)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);
        } else {
          alert(data.msg);
        }
        //this.getCards();
        //this.router.navigate(['/deals']);
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

  payWithCardAndSave() {
    var isNewCard = 'yes';
    var doSave = 'yes';
    var cardObject = {
      number: this.cardNumber, exp_month: this.expiryMonth,
      exp_year: this.expiryYear, cvc: this.cvc
    };
    this.stripeServices.payPackageWithCard(cardObject, this.packageDetails, isNewCard, doSave)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);
        } else {
          alert(data.msg);
        }
        this.getCards();
        //this.router.navigate(['/deals']);
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

  ngAfterViewInit() {

  }

  ngOnInit() {
    // this.route.params
    //   // (+) converts string 'id' to a number
    //   .switchMap((params: Params) => this.service.getHero(+params['id']))
    //   .subscribe((hero: Hero) => this.hero = hero);
  }

  //get users credit cards
  getCards() {
    this.stripeServices.getCards()
      .subscribe(data => {

        this.stripeCustomerId = data.stripe_cus_id;
        this.stripeCards = data.result;
        // if (this.stripeCards.length > 0) {
        //   this.cardListVisibility = false; //shown
        //   this.cardFormVisibility = true;

        // } else {
        //   this.cardListVisibility = true;  //hidden
        //   this.cardFormVisibility = false; //shown 
        // }


      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );
  }

}