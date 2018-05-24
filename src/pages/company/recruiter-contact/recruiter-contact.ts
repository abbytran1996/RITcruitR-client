import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  CompanyTabsPage,
  CompanyRegisterConfirmPage
} from '@app/pages/company';

import {
  CompanyRegisterModel,
  RecruiterRegisterModel,
  RecruiterContactModel,
  RecruiterModel,
  UserModel
} from '@app/models';

import {
  AuthService,
  RecruiterService,
  CompanyService
} from '@app/services';

//=========================================================================
// * RecruiterContactPage
//=========================================================================
// - Page to enter recruiter contact information
//   (contact email, phone, etc).
// - This is also the last step in company creation, so the company is
//   actually "created" here if in setup.
// - This same page is used for company primary recruiter setup, adding
//   a new recruiter to a company, and editing an existing recruiter's
//   contact info.
//_________________________________________________________________________
@Component({
  selector: 'page-recruiter-contact',
  templateUrl: 'recruiter-contact.html'
})
export class RecruiterContactPage {

  public user: UserModel;
  public companyModel: CompanyRegisterModel;
  public recruiterModel: RecruiterRegisterModel;
  public model = new RecruiterContactModel();
  public companyId: any;
  public isSetup = false;
  public isEdit = false;

  // ngForm object for validation control
  @ViewChild('contactForm') contactForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private companyService: CompanyService,
    private recruiterService: RecruiterService,
    private authService: AuthService
  ) {
    this.companyModel = navParams.get("company");
    this.recruiterModel = navParams.get("recruiter");

    // Determine if in setup or not
    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }

    // Determine if in edit mode or not
    if (navParams.get("edit") == true) {
      this.isEdit = true;
      this.model.contactEmail = this.recruiterModel.contactEmail;
      this.model.phoneNumber = this.recruiterModel.phoneNumber;
    }
  }

  /*
    Only available when in setup or creating a new recruiter, not editing.
    If in setup, create a new company with the information passed in and
    create the primary recruiter for that company.
    If not in setup and not in edit, create the new recruiter.
  */
  continueClicked() {
    if (this.contactForm && this.contactForm.valid) {
      if (this.isSetup) {

        /*
          Create the company
          =====================================================================
        */
        this.companyService.addCompany(this.companyModel).subscribe(
          companyData => {

            this.recruiterModel.phoneNumber = this.model.phoneNumber;
            this.recruiterModel.contactEmail = this.model.contactEmail;

            /*
              Create the recruiter for the company
              =================================================================
            */
            this.recruiterService.addRecruiter(companyData.id, this.recruiterModel).subscribe(
              recruiterData => {
                let recruiter = new RecruiterModel(recruiterData);

                // TODO: Remove this setLocalVars call after dev. We don't want
                // to "login" the recruiter after company creation because they
                // need to await approval. Keeping for dev.
                this.authService.setLocalVars(recruiterData.user);
                this.navCtrl.push(CompanyRegisterConfirmPage, {recruiter: recruiter});
              },

              // Recruiter create error
              error => {
                this.presentToast("There was an error registering the recruiter for your company, please try again");
              }
            );
          },

          // Company create error
          error => {
            this.presentToast("A company is already registered by that name, please contact our support team to report fraudulant companies");
          }
        );
      }
      else {
        // TODO: Call API to create recruiter (not for company registration).
        this.navCtrl.setRoot(CompanyTabsPage, {message: "New recruiter added successfully"});
      }
    }
    else {
      this.presentToast("Please enter a contact email and a phone number");
    }
  }

  /*
    Only available when editing an existing recruiter's contact info.
    Save the changes to the DB and return to the company tabs page.
  */
  saveClicked() {
    if (this.contactForm && this.contactForm.valid) {
      // TODO: Call API to update contact info for recruiter (edit mode)
      this.navCtrl.setRoot(CompanyTabsPage, {message: "Contact Information updated successfully"});
    }
    else {
      this.presentToast("Please enter a contact email and a phone number");
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
