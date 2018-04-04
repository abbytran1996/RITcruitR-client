import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { RecruiterRegisterPage } from '../recruiter-register/recruiter-register';

import { CompanyRegisterModel } from '../../models/company-register.model';

import { LocationsSearchModal } from '../../modals/locations-search/locations-search';

// TEMP lists, replace with API calls
const locations = [{text: 'Buffalo, New York', id: 0}, {text: 'Rochester, New York', id: 1}, {text: 'New York City, New York', id: 2}, {text: 'San Jose, California', id: 3}, {text: 'Seattle, Washington', id: 4}];
const companySizes = [{text: "Startup", id: 0}, {text: "Small", id: 1}, {text: "Medium", id: 2}, {text: "Large", id: 3}, {text: "Huge", id: 4}];

@Component({
  selector: 'page-company-register-2',
  templateUrl: 'company-register-2.html'
})
export class CompanyRegister2Page {

  // ngForm object for validation control
  @ViewChild('companyForm') companyForm;

  companyModel = new CompanyRegisterModel("", "", "", null, "");

  locationOptions = locations;
  companySizeOptions = companySizes;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.companyModel = navParams.get("company");
  }

  continueClicked() {
    if (this.companyForm && this.companyForm.valid) {
      this.navCtrl.push(RecruiterRegisterPage, {company: this.companyModel, setup: true});
    }
    else {
      this.presentToast("Please enter your company locations, size, and website");
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
