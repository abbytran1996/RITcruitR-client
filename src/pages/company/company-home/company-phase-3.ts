import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RecruiterModel } from '@app/models';

//=========================================================================
// * CompanyPhase3Page                                                   
//=========================================================================
// - Company match phase 3 page. Shows all jobs with matches in
//   phase 3. Jobs can be viewed and matches for the job can be reviewed.
//_________________________________________________________________________
@Component({
  selector: 'page-company-phase-3',
  templateUrl: 'company-phase-3.html'
})
export class CompanyPhase3Page {

  public recruiter: RecruiterModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.recruiter= navParams.get("recruiter");
  }
}
