import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RecruiterModel } from '../../models/recruiter.model';

@Component({
  selector: 'page-company-phase-1',
  templateUrl: 'company-phase-1.html'
})
export class CompanyPhase1Page {

  public recruiter: RecruiterModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.recruiter = navParams.get("recruiter");
  }
}
