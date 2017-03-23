import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { GooglePlaceService } from '../../services/index';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'guest-home',
  templateUrl: './guestHome.component.html'
  //styles: [main]
})
export class GuestHomeComponent implements AfterViewInit, OnInit {

  @ViewChild("search") public searchElementRef: ElementRef;

  postal_code: any = '';
  public commIcon=1;
  public searchControl: any = true;
  public searchValue: any = '';
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private googlePlace: GooglePlaceService,
    private router: Router
  ) {
  }


  selCommIcon(iconNumber:number){
    this.commIcon=iconNumber;
  }

  searchPackages() {
    if ('' == this.searchValue || '' == this.postal_code) {
      alert("Please enter any address");
      return false;
    }else{
      //this.router.navigate(['/package/search']);
      //this.router.navigate(['/package/search'], { queryParams: {zip:this.postal_code} });
      this.router.navigate(['/services'], { queryParams: {zip:this.postal_code} });
    }


  }

  



  ngAfterViewInit() {

    /*$(document).ready(function () {
      $("#owl-demo").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1],
        navigation: false,
        pagination: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        navigationText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"],
        transitionStyle: "fade",
      });
      //$(".s-box").selectbox();
    });*/
  }



  ngOnInit() {




    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //alert(place);

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          this.postal_code = this.googlePlace.postal_code(place.address_components) ? this.googlePlace.postal_code(place.address_components) : null;

        });
      });
    });
  }


}