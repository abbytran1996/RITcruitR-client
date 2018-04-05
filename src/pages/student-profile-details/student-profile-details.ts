import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { StudentEducationPage } from '../student-education/student-education';
import { StudentContactPage } from '../student-contact/student-contact';
import { StudentWorkExperiencePage } from '../student-work-experience/student-work-experience';

import { StudentModel } from '../../models/student.model';

@Component({
  selector: 'page-student-profile-details',
  templateUrl: 'student-profile-details.html'
})
export class StudentProfileDetailsPage {

  public student: StudentModel;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.student = navParams.get("student");
  }

  editEducation() {
    this.navCtrl.push(StudentEducationPage, {student: this.student});
  }

  editContact() {
    this.navCtrl.push(StudentContactPage, {student: this.student});
  }

  editWorkExperience() {
    this.navCtrl.push(StudentWorkExperiencePage, {student: this.student});
  }

  // Navigate back to the previous screen
  backBtn() {
    this.navCtrl.pop();
  }

  // Present a toast message to the user
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
