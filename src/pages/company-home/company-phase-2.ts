import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RecruiterModel } from '../../models/recruiter.model';

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
