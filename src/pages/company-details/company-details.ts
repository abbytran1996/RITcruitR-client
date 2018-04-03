import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { CompanyModel } from '../../models/company.model';

// TEMP lists, replace with API calls
const industries = [{text: 'Medical', id: 0}, {text: 'Food Service', id: 1}, {text: 'Transportation', id: 2}, {text: 'Hardware', id: 3}, {text: 'Software', id: 4}];
const locations = [{text: 'Buffalo, New York', id: 0}, {text: 'Rochester, New York', id: 1}, {text: 'New York City, New York', id: 2}, {text: 'San Jose, California', id: 3}, {text: 'Seattle, Washington', id: 4}];
const companySizes = [{text: "Startup", id: 0}, {text: "Small", id: 1}, {text: "Medium", id: 2}, {text: "Large", id: 3}, {text: "Huge", id: 4}];

@Component({
  selector: 'page-company-details',
  templateUrl: 'company-details.html'
})
export class CompanyDetailsPage {

  public user: any;
  public isSetup = false;
  public maxYear = undefined;

  industryOptions = industries;
  locationOptions = locations;
  companySizeOptions = companySizes;

  // ngForm object for validation control
  @ViewChild('companyForm') companyForm;

  // Form model for education fields
  companyModel = new CompanyModel("", "", [], [], null, "");

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.user = navParams.get("user");

    // TODO: Make API call or use incoming data to set fields.
    this.companyModel.name = "Intuit";
    this.companyModel.industries = [{text: 'Software', id: 4}];
    this.companyModel.locations = [{text: 'Rochester, New York', id: 1}, {text: 'New York City, New York', id: 2}];
    this.companyModel.companySize = 4;
    this.companyModel.website = "www.intuit.com";
  }

  saveClicked() {
    if (this.companyForm && this.companyForm.valid) {
      this.navCtrl.push(TabsPage, {message: "Company details updated successfully"});
    }
    else {
      this.presentToast("Please enter all company details");
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
