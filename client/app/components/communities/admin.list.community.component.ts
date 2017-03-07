import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CommunityServices, AlertService } from '../../services/index';



@Component({
  moduleId: module.id,
  selector: 'admin-community-list',
  templateUrl: './admin.list.community.component.html'
  //styles: [main]
})
export class AdminCommunityListComponent implements AfterViewInit {
  availableCommunities: any =[];
  
  pagetitle:String="Community List";

  //constructor start
  constructor(
    private router: Router,
    private communityServices: CommunityServices,
    private alertService: AlertService
  ) {


  }
  //end of constructor

  //get packages
  getAllCommunity() {
    this.communityServices.getAllCommunity()
      .subscribe(data => {
        this.availableCommunities = data.result;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );
  }

  deleteCommunity(communityId: any) {
    var con = confirm("Are you sure!, You want to delete this community");
    if (con) {


      this.communityServices.deleteCommunityByid(communityId)
        .subscribe(data => {
          if (data.status == 'success') {
            this.alertService.success(data.msg, 'communityAlert');
            this.getAllCommunity();
          } else {
            this.alertService.error(data.msg, 'communityAlert');
          }
        },
        error => {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          var errr = JSON.parse(err);

          this.alertService.error(errr.msg, 'communityAlert');
        }
        );
    }
  }
  ngAfterViewInit() {
    this.getAllCommunity();

  }
  ngOnInit() {
    
  }

  ngOnDestroy() {

  }

}