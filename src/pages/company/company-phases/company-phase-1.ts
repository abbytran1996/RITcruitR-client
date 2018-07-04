import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import {
  RecruiterModel,
  JobModel
} from '@app/models';

import {
  JobPostingService
} from '@app/services';

//=========================================================================
// * CompanyPhase1Page                                                   
//=========================================================================
// - Primary "dash" page for company. Shows all jobs with matches in
//   phase 1. Jobs can be viewed and matches can be accepted or declined.
//_________________________________________________________________________
@Component({
  selector: 'page-company-phase-1',
  templateUrl: 'company-phase-1.html'
})
export class CompanyPhase1Page {

  public recruiter: RecruiterModel;
  public currentJob: JobModel;
  public pageLoading = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private jobPostingService: JobPostingService
  ) {
    this.pageLoading = true;
    this.recruiter = navParams.get("recruiter");
    this.init();
  }

  /*
    Called when this page is "entered". Subscribe to an event to retrieve
    the recruiter model after an async call in the parent tabs page.
  */
  ionViewDidEnter() {
    this.pageLoading = true;

    this.events.subscribe('tabs:recruiter', (recruiter) => {
      this.recruiter = recruiter;
    });

    // Show the tabs bar now that we're in the main flow
    this.events.publish('tabs:setHidden', false, Date.now());

    this.init();
  }

  /*
    Called when this page is "exited". Unsubscribe to events.
  */
  ionViewDidLeave() {
    this.events.unsubscribe("tabs:recruiter");
  }

  /*
    Called to initialize the page with needed data.
  */
  init() {
    this.currentJob = this.jobPostingService.getCurrentJob();
    this.pageLoading = false;
  }
}
