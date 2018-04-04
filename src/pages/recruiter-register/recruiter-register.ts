import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { RecruiterContactPage } from '../recruiter-contact/recruiter-contact';

import { CompanyRegisterModel } from '../../models/company-register.model';
import { RecruiterRegisterModel } from '../../models/recruiter-register.model';

@Component({
  selector: 'page-recruiter-register',
  templateUrl: 'recruiter-register.html'
})
export class RecruiterRegisterPage {

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;

  companyModel = new CompanyRegisterModel("", "", "", null, "");
  recruiterModel = new RecruiterRegisterModel("", "", "", "", "", "", "");
  isSetup = false;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.companyModel = navParams.get("company");

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
  }

  // Attempt to register the recruiter
  continueClicked() {
    if (this.registerForm && this.registerForm.valid) {
      if (this.isSetup) {
        this.recruiterModel.passwordConfirm = this.recruiterModel.password;
        this.navCtrl.push(RecruiterContactPage, {company: this.companyModel, recruiter: this.recruiterModel, setup: true});
      }
      else {
        this.recruiterModel.passwordConfirm = this.recruiterModel.password;
        this.navCtrl.push(RecruiterContactPage, {company: this.companyModel, recruiter: this.recruiterModel});
      }
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
      position: 'top',
      showCloseButton: true,
      closeButtonText: ''
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
