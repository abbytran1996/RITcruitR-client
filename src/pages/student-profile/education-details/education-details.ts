import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TabsPage } from '../../tabs/tabs';

import { EducationDetailsModel } from '../../../models/education-details.model';

@Component({
  selector: 'page-education-details',
  templateUrl: 'education-details.html'
})
export class EducationDetailsPage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  // ngForm object for validation control
  @ViewChild('educationForm') educationForm;

  // Form model for education fields
  model = new EducationDetailsModel("", "", "", "");

  continueClicked() {
    if (this.educationForm && this.educationForm.valid) {
      this.navCtrl.push(TabsPage);
    }
    else {
      this.presentToast("Please enter your university name, major, GPA, and expected graduation date");
    }
  }

  skipClicked() {
    this.navCtrl.push(TabsPage);
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
      position: 'top'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
