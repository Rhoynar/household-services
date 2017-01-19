import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, CommunityServices } from '../../services/index'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'topnav',
  templateUrl: './topnav.component.html'
  //styles: [main]
})
export class TopnavComponent implements AfterViewInit {
  // parties: Observable<any[]>;
  // parties: Observable<Party[]>;
  loggedIn: any;
  communities: any = [];
  communityChanged = false;
  selectedCommunity: {} = { id: '', name: 'Select Community' };
  communityDropdownVisible = false;
  constructor(private router: Router,
    private authenticationService: AuthenticationService, private communityService: CommunityServices) {
    // this.parties = Parties.find({}).zone();
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }

    if (localStorage.getItem('selectedCommunity')) {
      
      this.selectedCommunity = JSON.parse(localStorage.getItem('selectedCommunity'));
    }


    this.communityService.getCommunities()
      .subscribe(
      data => {
        if (data.status == 'success') {
          this.communities = data.result
          this.communityChanged = true;
        }

      },
      error => {
        this.router.navigate(['/login']);
      }
      );

  }

  showDropDown() {
    this.communityDropdownVisible = true;
  }

  onCommunityChange(id: String, name: String) {
    //this.selectedCommunity = newValue;
    this.communityDropdownVisible = false;
    this.selectedCommunity = { id: id, name: name };
    localStorage.setItem('selectedCommunity',JSON.stringify(this.selectedCommunity));
  }

  

  ngAfterViewInit() {
    // $(document).ready(function () {
    //   $(".s-box").selectbox();
    // });
  }

  logout() {
    // reset login status
    this.authenticationService.logout()
      .subscribe(
      data => {

        this.router.navigate(['/login']);
        //return false;
      },
      error => {
        this.router.navigate(['/login']);
      }
      );

  }

}