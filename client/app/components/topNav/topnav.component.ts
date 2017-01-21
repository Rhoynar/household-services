import { Component,Input,Output,EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, CommunityServices } from '../../services/index'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'topnav',
  templateUrl: './topnav.component.html',
  //inputs: ['communityId','communityName']
  //styles: [main]
})
export class TopnavComponent implements AfterViewInit {
  // parties: Observable<any[]>;
  // parties: Observable<Party[]>;
  @Input() 
  selectedCommunity:{}={id:'',name:'Select Community'};
  @Output() 
  emitCommunityChange =new EventEmitter<any>();
  
  loggedIn: any;
  communities: any = [];
  communityChanged = false;
  
  communityDropdownVisible = false;
  constructor(private router: Router,
    private authenticationService: AuthenticationService, private communityService: CommunityServices) {
    // this.parties = Parties.find({}).zone();
   
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
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
    this.emitCommunityChange.emit(this.selectedCommunity);
    localStorage.setItem('selectedCommunity', JSON.stringify(this.selectedCommunity));
  }



  ngAfterViewInit() {
    if (localStorage.getItem('selectedCommunity')) {
      this.selectedCommunity = JSON.parse(localStorage.getItem('selectedCommunity'));
    }
    
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