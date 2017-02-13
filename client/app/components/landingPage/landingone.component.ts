import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
declare var $: any;
import { ModalDirective } from 'ng2-bootstrap';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { AuthenticationService,GooglePlaceService, PackageServices } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'landing-one',
  templateUrl: './landingone.component.html'
  //styles: [main]
})
export class LandingOneComponent implements AfterViewInit, OnInit {

  @ViewChild('learnMoreModal') public learnMoreModal: ModalDirective;
  @ViewChild("search") public searchElementRef: ElementRef;

  packages: any;
  postal_code: any = '';
  searched = false;
  loggedIn=false;
  /*street_number: any = '';
  street: any = '';
  city: any = '';
  state: any = '';
  
  district: any = '';
  country: any = '';
  lat: any = '';
  lng: any = '';
  adr_address: any = '';
  name: any = '';
  types: any = '';
  vicinity: any = '';*/

  searchControl: any = '';
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private googlePlace: GooglePlaceService,
    private packageService: PackageServices,
    private router: Router,
    private authenticationService: AuthenticationService) {

      this.authenticationService.generatetoken()
      .subscribe(result => {
        if (result === false) {
          this.loggedIn=false;
        }else{
          this.loggedIn=true;
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          var token = currentUser && currentUser.token;
          if(token.role=='admin'){
            this.router.navigate(['/admin']);
          }
          
        }
      });

  }

  hideLearnmoreModal() {
    this.learnMoreModal.hide();
    this.searchControl = '';
    this.postal_code = '';
    this.searched = false;
  }
  
  ngOnInit() {
    //create search FormControl
    this.searchControl = '';



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
          console.log(place);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.postal_code = this.googlePlace.postal_code(place.address_components) ? this.googlePlace.postal_code(place.address_components) : null;
          /*this.street_number = this.googlePlace.street_number(place.address_components) ?this.googlePlace.street_number(place.address_components) : null;
          this.street = this.googlePlace.street(place.address_components) ? this.googlePlace.street(place.address_components) : null;
          this.city = this.googlePlace.city(place.address_components) ? this.googlePlace.city(place.address_components) : null;
          this.state = this.googlePlace.state(place.address_components) ? this.googlePlace.state(place.address_components) : null;
          this.district = this.googlePlace.administrative_area_level_2(place.address_components) ? this.googlePlace.administrative_area_level_2(place.address_components) : null;
          this.country = this.googlePlace.country(place.address_components) ? this.googlePlace.country(place.address_components) : null;
          this.lat = place.geometry.location.lat() ? place.geometry.location.lat() : null;
          this.lng = place.geometry.location.lng() ? place.geometry.location.lng() : null;
          this.adr_address = place.formatted_address ? place.formatted_address : null;
          this.name = place.name ? place.name : null;
          this.types = place.types ? place.types : null;
          this.vicinity = place.vicinity ? place.vicinity : null;*/





        });
      });
    });
  }

  searchPackages() {
    if ('' == this.searchControl || '' == this.postal_code) {
      alert("Please enter any address");
      return false;
    }

    this.packageService.getPackageByZipcode(this.postal_code)
      .subscribe(
      data => {
        if (data.status == 'success') {
          this.packages = data.result
          this.searched = true;
        }
      },
      error => {

      }
      );

  }

  ngAfterViewInit() {


  }

}