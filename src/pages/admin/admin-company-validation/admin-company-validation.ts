import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  UserModel
} from '@app/models';

import {
  DataService,
  CompanyService
} from '@app/services';

//=========================================================================
// * AdminCompanyValidationPage
//=========================================================================
// - Page for admins to view registered companies and validate them,
//   approving the company to use the application.
//_________________________________________________________________________
@Component({
  selector: 'page-admin-company-validation',
  templateUrl: 'admin-company-validation.html'
})
export class AdminCompanyValidationPage {

  companies = [];
  currentCompany = {};

  public isApp = true;
  public user: UserModel;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private dataService: DataService,
    private companyService: CompanyService
  ) {
    this.isApp = dataService.isApp;
    this.user = navParams.get("user");

    // Get the list of companies awaiting approval
    this.companyService.getCompanyByStatus(false).subscribe(
      data => {
        this.companies = data;
      },
      error => {
        this.presentToast("This was an error retrieving the list of companies awaiting approval, please refresh")
      }
    );
  }

  /*
    Updates the current company upon clicking on a company on the list.
  */
  updateCompany(company) {
    this.currentCompany = company;
  }

  /*
    Approves the company
  */
  approveCompany(company) {
    let message = "";
    this.companyService.approveCompany(company.id).subscribe(
      data => {
        message = company.companyName + " has been approved."
      },
      error => {
        message = "There was an error approving company '" + company.companyName + "'. Please try again later."
      }
    );
    this.presentToast(message);
  }

  /*
    Denies the company
  */
  denyCompany(company) {
    let message = "";
    this.companyService.approveCompany(company.id).subscribe(
      data => {
        message = company.companyName + " has been denied."
      },
      error => {
        message = "There was an error denying company '" + company.companyName + "'. Please try again later."
      }
    );
    this.presentToast(message);
  }

  /*
    Present a toast message to the user.
  */
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
