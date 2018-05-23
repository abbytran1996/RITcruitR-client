import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { RecruiterRegisterPage } from '@app/pages/company';

import { CompanyRegisterModel } from '@app/models';

import { DataService } from '@app/services';

@Component({
  selector: 'page-company-register-2',
  templateUrl: 'company-register-2.html'
})
export class CompanyRegister2Page {

  // ngForm object for validation control
  @ViewChild('companyForm') companyForm;

  companyModel = new CompanyRegisterModel("", [], [], null, "");

  locationOptions = [];
  companySizeOptions = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public dataService: DataService
  ) {
    this.companyModel = navParams.get("company");

    // Get the data for the select fields
    this.locationOptions = this.dataService.getLocations();
    this.companySizeOptions = this.dataService.getCompanySizesForCompany();
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
