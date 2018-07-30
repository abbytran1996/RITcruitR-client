import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '@app/pages/general';
import { CompanyTabsPage } from '@app/pages/company';

//=========================================================================
// * CompanyRegisterConfirmPage
//=========================================================================
// - Page to confirm company registration and explain how approval works.
//_________________________________________________________________________
@Component({
  selector: 'page-company-register-confirm',
  templateUrl: 'company-register-confirm.html'
})
export class CompanyRegisterConfirmPage {

  public fromLogin = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.fromLogin = navParams.get("fromLogin") || false;
  }

  /*
    Send the user back to the login page.
  */
  okClicked() {
    this.navCtrl.push(LoginPage);
  }
}
