import { Component, ViewChild, ElementRef, AfterViewInit,OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, UserServices } from '../../services/index'
import { ProfileModel } from '../../models/profile.model'
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'editprofile',
  templateUrl: './editprofile.component.html'
  
})
export class EditprofileComponent implements AfterViewInit,OnInit {
  userProfile: any={};
  profile = new ProfileModel();
  constructor(private router: Router,
    private authenticationService: AuthenticationService, private userService: UserServices) {

    this.authenticationService.generatetoken()
      .subscribe(result => {
        if (result === false) {
          this.router.navigate(['/login']);
        }
      });

    
  }
  ngOnInit(){
    var userData = JSON.parse(localStorage.getItem('currentUser')).token;
    this.userService.getUserProfile(userData._id)
      .subscribe(data => {
        this.profile.id = data._id;
        this.profile.username = data.name;
        this.profile.useremail = data.email;
        
        
      },
      error=>{
        console.log(error);
      })
  }

  ngAfterViewInit() {

    $(document).ready(function () {
      $(".s-box").selectbox();
    });
  }

  profilePage(){
      this.router.navigate(['/profile']);
  }

  updateProfile(){
      
      console.log(this.profile)
    this.userService.updateProfile(this.profile)
      .subscribe(data => {
        alert(data.msg);
        this.router.navigate(['/login']);
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

}