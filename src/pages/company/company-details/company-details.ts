import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { CompanyTabsPage } from '@app/pages/company';

import {
  CompanyModel,
  RecruiterModel
} from '@app/models';

import {
  DataService,
  CompanyService
} from '@app/services';

//=========================================================================
// * CompanyDetailsPage                                                   
//=========================================================================
// - Page to update company detail info like company name, website, etc.
//_________________________________________________________________________
@Component({
  selector: 'page-company-details',
  templateUrl: 'company-details.html'
})
export class CompanyDetailsPage {

  public recruiterModel: RecruiterModel = new RecruiterModel();
  public companyModel: CompanyModel = new CompanyModel();
  public loading = false;

  industryOptions = [];
  locationOptions = [];
  companySizeOptions = [];

  // ngForm object for validation control
  @ViewChild('companyForm') companyForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public dataService: DataService,
    public companyService: CompanyService
  ) {
    this.recruiterModel = navParams.get("recruiter");
    this.companyModel = this.recruiterModel.company;

    // Get the data for the select fields
    this.locationOptions = this.dataService.getLocations();
    this.dataService.getIndustries().subscribe(
      resData => {
        this.industryOptions = resData;
      },
      res => { }
    );
    this.companySizeOptions = this.dataService.getCompanySizesForCompany();
  }

  /*
    Save changes to the company details in the model and the DB. Return to company tabs page.
  */
  saveChanges() {
    this.loading = true;
    if (this.companyForm && this.companyForm.valid) {
      this.companyService.updateCompany(this.companyModel).subscribe(
        data => {},
        res => {
          if (res.status == 200) {
            this.loading = false;
            this.navCtrl.setRoot(CompanyTabsPage, {message: "Company details updated successfully"});
          }
          else {
            this.presentToast("There was an error updating your education details, please try again");
            this.loading = false;
          }
        }
      );
    }
    else {
      this.presentToast("Please enter all company details");
      this.loading = false;
    }
  }

  /*
    Navigate back to the previous screen.
  */
  backBtn() {
    this.navCtrl.pop();
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
