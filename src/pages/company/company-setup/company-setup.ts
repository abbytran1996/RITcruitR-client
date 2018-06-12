import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {
  CompanyTabsPage,
  CompanyJobCreate1Page
} from '@app/pages/company';

//=========================================================================
// * CompanySetupPage
//=========================================================================
// - First part of company setup, showed upon first login.
// - Calls job creation to action and introduces job import option.
//_________________________________________________________________________
@Component({
  selector: 'page-company-setup',
  templateUrl: 'company-setup.html'
})
export class CompanySetupPage {

  private companyId = undefined;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.companyId = navParams.get("companyId");
  }

  /*
    Navigates to company job creation page.
  */
  createJobClicked() {
    this.navCtrl.push(CompanyJobCreate1Page, {companyId: this.companyId});
  }

  /*
    Navigates to job import page.
  */
  importJobClicked() {
    // TODO: Implement Handshake job importing here (future iteration)
    this.navCtrl.push(CompanyTabsPage);
  }
}
