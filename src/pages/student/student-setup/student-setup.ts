import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StudentSetupFormsPage } from '@app/pages/student';

import { StudentModel } from '@app/models';

//=========================================================================
// * StudentSetupPage                                                   
//=========================================================================
// - "Info" page to thank the student for signing up and introducing the
//   following setup process.
//_________________________________________________________________________
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

  /*
    Continue to the first setup page.
  */
  continueClicked() {
    this.navCtrl.push(StudentSetupFormsPage, {student: this.student, setup: true});
  }
}
