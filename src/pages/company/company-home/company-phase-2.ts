import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RecruiterModel } from '@app/models';

//=========================================================================
// * CompanyPhase2Page                                                   
//=========================================================================
// - Company match phase 2 page. Shows all jobs with matches in
//   phase 2. Jobs can be viewed and matches can be accepted or declined.
//_________________________________________________________________________
@Component({
  selector: 'page-company-phase-2',
  templateUrl: 'company-phase-2.html'
})
export class CompanyPhase2Page {

  public recruiter: RecruiterModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.recruiter= navParams.get("recruiter");
  }
}
