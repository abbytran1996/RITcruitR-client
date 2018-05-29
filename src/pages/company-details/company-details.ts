import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { CompanyModel } from '../../models/company.model';
import { RecruiterModel } from '../../models/recruiter.model';

import { DataService } from '../../app/services/data.service';
import { CompanyService } from '../../app/services/company.service';

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

  // Form model
  recruiterModel: RecruiterModel;
  companyModel = new CompanyModel(0, "", [], [], null, true, "", "", "", "", null, []);

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public dataService: DataService,
    public companyService: CompanyService
  ) {
    this.recruiterModel = navParams.get("recruiter");
    this.companyModel = this.recruiterModel.company;
    console.log(this.companyModel);

    // Get the data for the select fields
    this.locationOptions = this.dataService.getLocations();
    this.industryOptions = this.dataService.getIndustries();
    this.companySizeOptions = this.dataService.getCompanySizesForCompany();
  }

  saveClicked() {
    if (this.companyForm && this.companyForm.valid) {
      this.companyService.updateCompany(this.companyModel).subscribe(
        data => {},
        res => {
          if (res.status == 200) {
              this.navCtrl.push(TabsPage, {message: "Company details updated successfully"});
          }
          else {
            this.presentToast("There was an error updating your education details, please try again");
          }
        }
      );
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
