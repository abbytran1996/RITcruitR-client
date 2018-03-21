import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { RecruiterRegisterPage } from '../recruiter-register/recruiter-register';

@Component({
  selector: 'page-recruiter-company-select',
  templateUrl: 'recruiter-company-select.html'
})
export class RecruiterCompanySelectPage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  // ngForm object for validation control
  @ViewChild('companyForm') companyForm;

  // Form model for inputs
  model = {company: ""};

  // Attempt to register the recruiter
  continueBtn() {
    if (this.companyForm && this.companyForm.valid) {
      this.navCtrl.push(RecruiterRegisterPage, {company: this.model.company});
    }
    else {
      this.presentToast("Please select a company in the list of registered companies. If your company cannot be found in the list, register your company by tapping the button at the bottom of the screen");
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
