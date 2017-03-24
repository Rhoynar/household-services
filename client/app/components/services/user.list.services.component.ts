import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices, AlertService, AuthenticationService, GooglePlaceService, PackageServices, CommunityServices } from '../../services/index';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'user-services-list',
  templateUrl: './user.list.services.component.html'
  //styles: [main]
})
export class UserListServicesComponent implements AfterViewInit {
  public servicesList: any;
  public communityList: any;
  public loggedIn = false;
  public zipcode: any = "";
  public pagetitle: String = "Services in your Community";
  public searchServicesForm: FormGroup;
  public userCommunityId = '';
  public selectedCommunity: any = {};
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private packageService: PackageServices,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private userService: UserServices,
    private authenticationService: AuthenticationService,
    private communityServices: CommunityServices,
  ) {
    let params: any = this.activatedRoute.snapshot.queryParams;

    var currentUserStr = localStorage.getItem('currentUser');
    var currentUser = JSON.parse(currentUserStr);
    console.log(currentUser);
    this.zipcode = params.zip;
    if (params.zip) {
      this.getPackageByZipcode();
    } else if (currentUserStr) {
      this.zipcode = currentUser.token.zipcode;
      if (currentUser.token.cummunityId) {
        this.userCommunityId = currentUser.token.cummunityId;

        
        this.communityServices.getCommunityByid(this.userCommunityId)
          .subscribe(data => {
            this.selectedCommunity = data.result;
          },
          error => {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);

          }
          );
      }

      if (this.zipcode != '') {
        this.getPackageByZipcode();
      }

    } else {
      this.pagetitle = "Services from all communities"
      this.getAllPackage();
    }

  }

  //get packages
  getAllPackage() {
    this.packageService.getAllPackage()
      .subscribe(data => {
        this.servicesList = data.result;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );
  }

  selectCommunity(index: number) {
    this.selectedCommunity = this.communityList[index];
    this.userCommunityId = this.selectedCommunity._id;
    var userData = { userData: { zipcode: this.zipcode, cummunityId: this.userCommunityId } };
    this.userService.updateUserProfile(userData)
      .subscribe(data => {


      },
      error => {


      }
      );

  }

  cancelCommunitySelection() {
    this.selectedCommunity = {};
    this.userCommunityId = '';
  }
  getPackageByZipcode() {
    this.communityServices.getCommunityByZipCode(this.zipcode)
      .subscribe(data => {
        this.communityList = data.result;
        if (this.communityList.length == 0) {
          //this.router.navigate(['/noservice/'+this.zipcode]);
          this.router.navigate(['/noservice'], { queryParams: { zip: this.zipcode } });
        }

      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );
  }
  //get packages
  /*getPackageByZipcode() {
    this.packageService.getPackageByZipcode(this.zipcode)
      .subscribe(data => {
        this.servicesList = data.result;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );
  }*/

  searchService() {
    this.zipcode = this.searchServicesForm.value.zipcode;
    this.getPackageByZipcode();
  }

  ngAfterViewInit() {


  }

  ngOnInit() {
    this.searchServicesForm = this.fb.group({
      zipcode: ['', Validators.compose([Validators.required])],
    });
  }

}