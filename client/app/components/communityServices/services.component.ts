import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CommunityServices, StripeServices } from '../../services/index';

declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: './services.component.html'

})
export class ServicesComponent implements AfterViewInit, OnInit, OnDestroy {
  selectedCommunity: {} = { id: '', name: '' };
  availableServices: any;
  loggedIn: any = false;
  servicesVisibility: any = false; //show services by default
  stripeCards: any = [];
  cardListVisibility: any = true; //hidden
  cardFormVisibility: any = true; //hidden
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  stripeCustomerId: string = '';
  selectedService: {} = {};
  selectedServiceVision = true;//hidden
  selectedCardId: String = '';

  //constructor start
  constructor(
    private router: Router,
    private communityService: CommunityServices,
    private stripeServices: StripeServices
  ) {
    // this.parties = Parties.find({}).zone();

  }
  //end of constructor

  buyService(serviceId: any, serviceIndex: any) {
    
    this.selectedService = this.availableServices[serviceIndex];
    this.getCards();
    this.servicesVisibility = true;//hide this section
    this.selectedServiceVision = false;//show
  }

  cancelPurchase() {
    this.servicesVisibility = false;//show this section
    this.cardListVisibility = true; //hide
    this.cardFormVisibility = true;
    this.selectedServiceVision = true;//hide
  }

  selectCard(cardDetails: any) {
    this.cvc = '';
    this.selectedCardId = cardDetails.id;
  }

  makePayment(cardDetails: any) {
    this.selectedCardId = cardDetails.id;
    var con = confirm('Are you Sure, you wanna make this payment?');
    if (con) {
      this.stripeServices.createServiceCharge(cardDetails, this.selectedService)
        .subscribe(data => {

          alert(data.msg);
          this.router.navigate(['/orders']);
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

  addCardAndPay(){
    this.stripeServices.postCardAndServiceDetails({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc,
      
    },this.selectedService)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);
        } else {
          alert(data.msg);
        }
        this.getCards();
        this.router.navigate(['/orders']);
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

  //get users credit cards
  getCards() {
    this.stripeServices.getCards()
      .subscribe(data => {

        this.stripeCustomerId = data.stripe_cus_id;
        this.stripeCards = data.result;
        if (this.stripeCards.length > 0) {
          this.cardListVisibility = false; //shown
          this.cardFormVisibility = true;
          //this.toggleCards();
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

  

  toggleCards() {
    this.selectedCardId='';
    this.cardFormVisibility = !this.cardFormVisibility; //shown 
    this.cardListVisibility = !this.cardListVisibility; //shown 
  }

  myCrazyCallback(test: any) {
    // console.log(test);
    this.selectedCommunity = test;
    //this.getAvailableServices();
    this.communityService.getAllServices(this.selectedCommunity)
      .subscribe(
      data => {
        if (data.status == 'success') {
          this.availableServices = data.result
        }
      },
      error => {
        this.router.navigate(['/login']);
      }
      );
  }

  getAvailableServices() {
    if (localStorage.getItem('selectedCommunity')) {
      this.selectedCommunity = JSON.parse(localStorage.getItem('selectedCommunity'));
    }


    this.communityService.getAllServices(this.selectedCommunity)
      .subscribe(
      data => {
        if (data.status == 'success') {
          this.availableServices = data.result
        }
      },
      error => {
        this.router.navigate(['/login']);
      }
      );
  }

  ngAfterViewInit() {
    this.getAvailableServices();

  }
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }
  }

  ngOnDestroy() {

  }

}