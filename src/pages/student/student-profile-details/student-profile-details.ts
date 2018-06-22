import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  StudentDetailFormsPage
} from '@app/pages/student';

import { StudentModel } from '@app/models';

//=========================================================================
// * StudentProfileDetails                                                   
//=========================================================================
// - Show nav options to edit other profile information such as
//   education, contact, and work experience info.
//_________________________________________________________________________
@Component({
  selector: 'page-student-profile-details',
  templateUrl: 'student-profile-details.html'
})
export class StudentProfileDetailsPage {

  public student: StudentModel;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.student = navParams.get("student");
  }

  /*
    Show the student education page to edit education details.
  */
  editEducation() {
    this.navCtrl.push(StudentDetailFormsPage, {student: this.student, startStep: 0});
  }

  /*
    Show the student contact page to edit contact details.
  */
  editContact() {
    this.navCtrl.push(StudentDetailFormsPage, {student: this.student, startStep: 1});
  }

  /*
    Show the student work experience page to edit work experience.
  */
  editWorkExperience() {
    this.navCtrl.push(StudentDetailFormsPage, {student: this.student, startStep: 4});
  }

  /*
    Navigate back to the previous screen
  */
  backBtn() {
    this.navCtrl.pop();
  }

  /*
    Present a toast message to the user.
  */
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: ''
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
