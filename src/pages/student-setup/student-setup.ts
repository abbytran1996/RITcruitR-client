import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { EducationDetailsPage } from '../student-profile/education-details/education-details';

@Component({
  selector: 'page-student-setup',
  templateUrl: 'student-setup.html'
})
export class StudentSetupPage {

  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get("user");
  }

  continueClicked() {
    this.navCtrl.push(EducationDetailsPage, {user: this.user});
  }

  skipAllClicked() {
    this.navCtrl.push(TabsPage, {user: this.user.user});
  }
}
