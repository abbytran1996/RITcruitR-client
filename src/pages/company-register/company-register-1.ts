import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { CompanyRegister2Page } from './company-register-2';

import { CompanyRegisterModel } from '../../models/company-register.model';

import { SelectSearchable } from 'ionic-select-searchable';

// TEMP list for type ahead
const industries = [{text: 'Medical', id: 0}, {text: 'Food Service', id: 1}, {text: 'Transportation', id: 2}, {text: 'Hardware', id: 3}, {text: 'Software', id: 4}];

@Component({
  selector: 'page-company-register-1',
  templateUrl: 'company-register-1.html'
})
export class CompanyRegister1Page {

  // ngForm object for validation control
  @ViewChild('companyForm') companyForm;

  companyModel = new CompanyRegisterModel("", "", "", null, "");

  industryOptions = industries;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  continueClicked() {
    if (this.companyForm && this.companyForm.valid) {
      this.navCtrl.push(CompanyRegister2Page, {company: this.companyModel});
    }
    else {
      this.presentToast("Please enter your company name and select any industries it operates in");
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
