import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { StudentEducationPage } from '../student-education/student-education';
import { StudentContactPage } from '../student-contact/student-contact';
import { StudentWorkExperiencePage } from '../student-work-experience/student-work-experience';

@Component({
  selector: 'page-student-profile-details',
  templateUrl: 'student-profile-details.html'
})
export class StudentProfileDetailsPage {

  public user: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.user = navParams.get("user");
  }

  editEducation() {
    this.navCtrl.push(StudentEducationPage, {user: this.user});
  }

  editContact() {
    this.navCtrl.push(StudentContactPage, {user: this.user});
  }

  editWorkExperience() {
    this.navCtrl.push(StudentWorkExperiencePage, {user: this.user});
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