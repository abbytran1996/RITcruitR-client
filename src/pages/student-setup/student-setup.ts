import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { EducationDetailsPage } from '../student-profile/education-details/education-details';

@Component({
  selector: 'page-student-setup',
  templateUrl: 'student-setup.html'
})
export class StudentSetupPage {

  constructor(public navCtrl: NavController) {

  }

  continueClicked() {
    this.navCtrl.push(EducationDetailsPage);
  }

  skipAllClicked() {
    this.navCtrl.push(TabsPage);
  }
}
