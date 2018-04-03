import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentEducationPage } from '../student-education/student-education';

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
    this.navCtrl.push(StudentEducationPage, {user: this.user, setup: true});
  }

  skipAllClicked() {
    this.navCtrl.push(TabsPage, {user: this.user.user});
  }
}
