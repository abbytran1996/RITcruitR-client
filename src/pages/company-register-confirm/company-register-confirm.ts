import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-company-register-confirm',
  templateUrl: 'company-register-confirm.html'
})
export class CompanyRegisterConfirmPage {

  user = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get("user");
  }

  continueClicked() {
    this.navCtrl.push(TabsPage, {user: this.user, companyId: 0, isStudent: false}); // TODO: Remove this function and button.
  }
}
