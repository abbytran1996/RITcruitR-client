import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentEducationPage } from '../student-education/student-education';

import { StudentModel } from '../../models/student.model';

@Component({
  selector: 'page-student-setup',
  templateUrl: 'student-setup.html'
})
export class StudentSetupPage {

  public student: StudentModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.student = navParams.get("student");
  }

  continueClicked() {
    this.navCtrl.push(StudentEducationPage, {student: this.student, setup: true});
  }
}
