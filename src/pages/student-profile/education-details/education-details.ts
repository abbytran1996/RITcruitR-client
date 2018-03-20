import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { TabsPage } from '../../tabs/tabs';

import { EducationDetailsForm } from '../../../forms/education-details.form';

@Component({
  selector: 'page-education-details',
  templateUrl: 'education-details.html'
})
export class EducationDetailsPage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;

  // Form model for education fields
  model = new EducationDetailsForm("", "", "");

  continueClicked() {

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
