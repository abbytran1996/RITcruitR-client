import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { StudentTabsPage } from '../student-tabs/student-tabs';

import { StudentModel } from '../../models/student.model';

@Component({
  selector: 'page-student-work-experience',
  templateUrl: 'student-work-experience.html'
})
export class StudentWorkExperiencePage {

  public student: StudentModel;
  public isSetup = false;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.student = navParams.get("student");

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
  }

  continueClicked() {
    this.navCtrl.push(StudentTabsPage, {student: this.student});
  }

  skipClicked() {
    this.navCtrl.push(StudentTabsPage, {student: this.student, setup: true});
  }

  saveClicked() {
    this.navCtrl.setRoot(StudentTabsPage, {message: "Work experience updated successfully"});
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
