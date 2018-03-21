import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { RecruiterSetupPage } from '../recruiter-setup/recruiter-setup';

import { RecruiterRegisterModel } from '../../models/recruiter-register.model';

@Component({
  selector: 'page-recruiter-register',
  templateUrl: 'recruiter-register.html'
})
export class RecruiterRegisterPage {

  company = undefined;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.company = navParams.get("company");
    console.log(this.company);
  }

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;

  // Form model for register fields
  model = new RecruiterRegisterModel("", "", "", "");

  // Attempt to register the recruiter
  register() {
    if (this.registerForm && this.registerForm.valid) {
      this.navCtrl.push(RecruiterSetupPage);
    }
    else {
      this.presentToast("Please enter a valid email, password, first name, and last name");
    }
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
