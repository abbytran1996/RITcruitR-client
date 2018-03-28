import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-recruiter-setup',
  templateUrl: 'recruiter-setup.html'
})
export class RecruiterSetupPage {

  constructor(public navCtrl: NavController) {

  }

  continueClicked() {
    this.navCtrl.push(TabsPage);
  }

  skipAllClicked() {
    this.navCtrl.push(TabsPage);
  }
}
