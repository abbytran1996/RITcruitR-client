import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  UserModel,
  CompanyModel,
  RecruiterModel
} from '@app/models';

import {
  DataService,
  CompanyService,
  RecruiterService,
  HelperService
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
  
  public isApp = true;
  public user: UserModel;

  public companies: Array<CompanyModel> = [];
  public currentCompany: CompanyModel;
  public currentRecruiter: RecruiterModel;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private dataService: DataService,
    private companyService: CompanyService,
    private recruiterService: RecruiterService,
    private helperService: HelperService
  ) {
    this.isApp = dataService.isApp;
    this.user = navParams.get("user");

    // Get the list of companies awaiting approval
    this.companyService.getCompanyByStatus("awaiting").subscribe(
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
    this.recruiterService.getRecruitersByCompany(company.id).subscribe(
      resData => {
        this.currentCompany = new CompanyModel(company);
        this.currentRecruiter = new RecruiterModel(resData[0]);
      },
      res => {
      }
    );
  }

  /*
    Approves the company
  */
  approveCompany(company) {
    this.companyService.approveCompany(company).subscribe(
      resData => {
      },
      res => {
        this.presentToast(company.companyName + " has been approved");
        this.removeCurrentCompany();
      }
    );
  }

  /*
    Denies the company
  */
  denyCompany(company) {
    this.companyService.denyCompany(company).subscribe(
      resData => {
      },
      res => {
        this.presentToast(company.companyName + " has been denied");
        this.removeCurrentCompany();
      }
    );
  }

  /*
    Removes the current company from the list.
  */
  removeCurrentCompany() {
    this.companies = this.helperService.removeFromArrayById(this.companies, this.currentCompany);
    this.currentCompany = undefined;
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
