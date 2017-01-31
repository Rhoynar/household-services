import {Component, ViewChild, ElementRef, AfterViewInit,NgZone, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $:any;
import { MapsAPILoader } from 'angular2-google-maps/core';


@Component({
  moduleId:module.id,
  selector: 'landing-one',
  templateUrl:'./landingone.component.html'
  //styles: [main]
})
export class LandingOneComponent implements AfterViewInit,OnInit {
  
  @ViewChild("search")
  public searchElementRef: ElementRef;

  searchControl:any='';
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
   

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

          
        });
      });
    });
  }

  

  ngAfterViewInit() {
        
        
    }

}