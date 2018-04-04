import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { CompanyJobCreate1Page } from '../company-job-create/company-job-create-1';

@Component({
  selector: 'page-company-setup',
  templateUrl: 'company-setup.html'
})
export class CompanySetupPage {

  companyId = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.companyId = navParams.get("companyId");
  }

  createJobClicked() {
    this.navCtrl.push(CompanyJobCreate1Page, {companyId: this.companyId});
  }

  importJobClicked() {
    // Implement Handshake job importing here (future iteration)
    this.navCtrl.push(TabsPage);
  }
}