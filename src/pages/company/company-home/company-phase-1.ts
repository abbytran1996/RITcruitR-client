import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { RecruiterModel } from '@app/models';

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
  }

  /*
    Called when this page is "exited". Unsubscribe to events.
  */
  ionViewDidLeave() {
   this.events.unsubscribe("tabs:recruiter");
  }
}
