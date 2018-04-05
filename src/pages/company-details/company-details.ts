import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { CompanyModel } from '../../models/company.model';

import { DataService } from '../../app/services/data.service';

@Component({
  selector: 'page-company-details',
  templateUrl: 'company-details.html'
})
export class CompanyDetailsPage {

  public user: any;

  industryOptions = [];
  locationOptions = [];
  companySizeOptions = [];

  // ngForm object for validation control
  @ViewChild('companyForm') companyForm;

  // Form model for education fields
  companyModel = new CompanyModel(0, "", [], [], null, true, "", "", "", "", null);

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public dataService: DataService
  ) {
    this.user = navParams.get("user");

    // Get the data for the select fields
    this.locationOptions = this.dataService.getLocations();
    this.industryOptions = this.dataService.getIndustries();
    this.companySizeOptions = this.dataService.getCompanySizesForCompany();

    // TODO: Set these fields with actual incoming company data.
    this.companyModel.companyName = "Intuit";
    this.companyModel.industry = ['Software'];
    this.companyModel.location = ['Rochester, New York', 'New York City, New York'];
    this.companyModel.size = 4;
    this.companyModel.websiteURL = "www.intuit.com";
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
