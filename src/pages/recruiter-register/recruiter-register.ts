import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { CompanySetupPage } from '../company-setup/company-setup';

import { CompanyRegisterModel } from '../../models/company-register.model';
import { RecruiterRegisterModel } from '../../models/recruiter-register.model';

@Component({
  selector: 'page-recruiter-register',
  templateUrl: 'recruiter-register.html'
})
export class RecruiterRegisterPage {

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;

  companyId = undefined;
  recruiterModel = new RecruiterRegisterModel("", "", "", "");

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.companyId = navParams.get("companyId");
  }

  // Attempt to register the recruiter
  register() {
    if (this.registerForm && this.registerForm.valid) {
      if (this.companyId == undefined) {
        // Just register the recruiter
        this.navCtrl.push(CompanySetupPage); // TODO: Change this when multiple recruiter registration is added
      }
      else {
        // Register the company, then the recruiter for that company
        this.navCtrl.push(CompanySetupPage, {companyId: this.companyId});
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
