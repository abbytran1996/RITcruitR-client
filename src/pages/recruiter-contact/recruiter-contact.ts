import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { CompanyRegisterConfirmPage } from '../company-register-confirm/company-register-confirm';

import { CompanyRegisterModel } from '../../models/company-register.model';
import { RecruiterRegisterModel } from '../../models/recruiter-register.model';
import { RecruiterContactModel } from '../../models/recruiter-contact.model';
import { RecruiterModel } from '../../models/recruiter.model';

import { CompanyService } from '../../app/services/company.service';
import { RecruiterService } from '../../app/services/recruiter.service';
import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'page-recruiter-contact',
  templateUrl: 'recruiter-contact.html'
})
export class RecruiterContactPage {

  public user: any;
  public companyId: any;
  public isSetup = false;
  public isEdit = false;

  // ngForm object for validation control
  @ViewChild('contactForm') contactForm;

  // Form models
  companyModel = new CompanyRegisterModel("", "", "", null, "");
  recruiterModel = new RecruiterRegisterModel("", "", "", "", "", "", "");
  model = new RecruiterContactModel("", "");

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, private companyService: CompanyService, private recruiterService: RecruiterService, private authService: AuthService) {
    this.companyModel = navParams.get("company");
    this.recruiterModel = navParams.get("recruiter");

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }

    if (navParams.get("edit") == true) {
      this.isEdit = true;

      // TODO: Add call or use incoming data to set the model to the existing data.
      this.model.contactEmail = "contact@example.com";
      this.model.phoneNumber = "716-123-4567";
    }
  }

  continueClicked() {
    if (this.contactForm && this.contactForm.valid) {
      if (this.isSetup) {
        // TODO: When multiple locations and industries gets added, change this.
        this.companyModel.location = this.companyModel.location[0].text;
        this.companyModel.industry = this.companyModel.industry[0].text;

        // Create the company
        this.companyService.addCompany(this.companyModel).subscribe(
          companyData => {

            this.recruiterModel.phoneNumber = this.model.phoneNumber;
            this.recruiterModel.contactEmail = this.model.contactEmail;

            // Create the recruiter for the company
            this.recruiterService.addRecruiter(companyData.id, this.recruiterModel).subscribe(
              recruiterData => {
                let recruiter = RecruiterModel.createRecruiterFromApiData(recruiterData);
                this.authService.setLocalVars(recruiterData.user);
                this.navCtrl.push(CompanyRegisterConfirmPage, {recruiter: recruiter});
              },
              error => {
                this.presentToast("There was an error registering the recruiter for your company, please try again");
              }
            );
          },
          error => {
            this.presentToast("A company is already registered by that name, please contact our support team to report fraudulant companies");
          }
        );
      }
      else {
        // TODO: Call API to create recruiter.
        // TODO: Call API to create contact info (this could be bundled into the previous step in the future).
        this.navCtrl.setRoot(TabsPage, {message: "New recruiter added successfully"});
      }
    }
    else {
      this.presentToast("Please enter a contact email and a phone number");
    }
  }

  saveClicked() {
    if (this.contactForm && this.contactForm.valid) {
      // TODO: Call API to update contact info
      this.navCtrl.setRoot(TabsPage, {message: "Contact Information updated successfully"});
    }
    else {
      this.presentToast("Please enter a contact email and a phone number");
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
