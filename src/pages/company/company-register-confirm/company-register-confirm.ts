import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  continueClicked() {
     // TODO: Change this so it leads back to the login screen, keep for dev
    this.navCtrl.push(CompanyTabsPage);
  }
}
