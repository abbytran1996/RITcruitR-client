import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CompanyTabsPage } from '@app/pages/company';

@Component({
  selector: 'page-company-register-confirm',
  templateUrl: 'company-register-confirm.html'
})
export class CompanyRegisterConfirmPage {

  user = undefined;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.user = navParams.get("user");
  }

  continueClicked() {
     // TODO: Change this so it leads back to the login screen, keep for dev
    this.navCtrl.push(CompanyTabsPage);
  }
}
