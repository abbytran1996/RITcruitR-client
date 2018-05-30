import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import {
  CompanyPhase1Page
} from '@app/pages/company';

import { RecruiterModel } from '@app/models';

//=========================================================================
// * CompanyJobMatchesPage                                                   
//=========================================================================
// - Primary "dash" page for company. Shows all jobs.
//   Jobs can be viewed and matches can be accepted or declined.
//_________________________________________________________________________
@Component({
  selector: 'page-company-job-matches',
  templateUrl: 'company-job-matches.html'
})
export class CompanyJobMatchesPage {

  public recruiter: RecruiterModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    this.recruiter = navParams.get("recruiter");
  }

  /*
    Called when this page is "entered". Subscribe to an event to retrieve
    the recruiter model after an async call in the parent tabs page.
  */
  ionViewDidEnter() {
    this.events.subscribe('tabs:recruiter', (recruiter) => {
      this.recruiter = recruiter;
    });

    // Hide the tabs bar on this page
    this.events.publish('tabs:setHidden', true, Date.now());
  }

  /*
    Called when this page is "exited". Unsubscribe to events.
  */
  ionViewDidLeave() {
   this.events.unsubscribe("tabs:recruiter");
  }

  /*
    View matches in the main flow for the selected job.
  */
  viewJobMatches() {
    this.events.publish('tabs:setActive', 1, Date.now());
  }
}
