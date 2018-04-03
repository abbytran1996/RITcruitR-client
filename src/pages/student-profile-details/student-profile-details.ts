import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { StudentEducationPage } from '../student-education/student-education';

@Component({
  selector: 'page-student-profile-details',
  templateUrl: 'student-profile-details.html'
})
export class StudentProfileDetailsPage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    
  }

  editEducation() {
    this.navCtrl.push(StudentEducationPage);
  }

  editWorkExperience() {

  }

  editProjects() {

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
