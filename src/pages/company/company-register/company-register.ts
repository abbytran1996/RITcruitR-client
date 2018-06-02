import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  CompanyRegisterModel,
  RecruiterRegisterModel,
  RecruiterContactModel,
  RecruiterModel,
  UserModel
} from '@app/models';

import { CompanyRegisterConfirmPage } from '@app/pages/company';

import {
  FormSequenceService,
  DataService,
  RecruiterService,
  CompanyService,
  AuthService
} from '@app/services';

//=========================================================================
// * CompanyRegisterPage
//=========================================================================
// - Page to registe a new company.
// - Multistep form sequence.
//_________________________________________________________________________
@Component({
  selector: 'page-company-register',
  templateUrl: 'company-register.html'
})
export class CompanyRegisterPage {

  // Step 0 variables
  @ViewChild('form0') form0;
  industryOptions = [];

  // Step 1 variables
  @ViewChild('form1') form1;
  locationOptions = [];
  companySizeOptions = [];

  // Step 2 variables
  @ViewChild('form2') form2;

  // Step 3 variables
  @ViewChild('form3') form3;

  // Implementation specific variables
  public companyModel = new CompanyRegisterModel();
  public recruiterModel = new RecruiterRegisterModel();
  public contactModel = new RecruiterContactModel();
  public saving = false;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public formSeq: FormSequenceService,
    public dataService: DataService,
    private companyService: CompanyService,
    private recruiterService: RecruiterService,
    private authService: AuthService
  ) {
    this.formSeq.reset();
    this.formSeq.startStep = navParams.get("startStep") || 0;
    this.formSeq.formTitles = [
      "Company Information",
      "Company Information",
      "Primary Recruiter",
      "Recruiter Contact"
    ];
    this.formSeq.formErrorMessages = [
      "Please enter your company name and select any industries it operates in",
      "Please enter your company locations, size, and website",
      "Please enter a valid email, password, first name, and last name",
      "Please enter a contact email and a phone number"
    ];

    // Get the data for the select fields
    this.industryOptions = this.dataService.getIndustries();
    this.locationOptions = this.dataService.getLocations();
    this.companySizeOptions = this.dataService.getCompanySizesForCompany();
  }

  /*
    Prepare the first step upon entering the page.
  */
  ionViewDidEnter() {
    let formsArray = [
      this.form0,
      this.form1,
      this.form2,
      this.form3
    ];

    this.formSeq.init(formsArray);
  }

  /*
    Continue to the next step of company registration.
  */
  continueClicked() {
    if (this.formSeq.currentForm && this.formSeq.currentForm.valid) {
      if (this.formSeq.currentStep == this.formSeq.maxSteps) {
        this.saving = true;
        this.recruiterModel.passwordConfirm = this.recruiterModel.password;

        /*
          Create the company
          =====================================================================
        */
        this.companyService.addCompany(this.companyModel).subscribe(
          companyData => {

            this.recruiterModel.phoneNumber = this.contactModel.phoneNumber;
            this.recruiterModel.contactEmail = this.contactModel.contactEmail;

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
                this.saving = false;
                this.navCtrl.push(CompanyRegisterConfirmPage, { recruiter: recruiter });
              },

              // Recruiter create error
              error => {
                this.presentToast("There was an error registering the recruiter for your company, please try again");
                this.saving = false;
              }
            );
          },

          // Company create error
          error => {
            this.presentToast("A company is already registered by that name, please contact our support team to report fraudulant companies");
            this.saving = false;
          }
        );
      }
      else {
        this.formSeq.nextStep();
      }
    }
    else {
      this.presentToast(this.formSeq.formErrorMessages[this.formSeq.currentStep]);
    }
  }

  /*
    Navigate back to the previous step.
  */
  backBtn() {
    if (this.saving) return;

    if (this.formSeq.currentStep == this.formSeq.startStep) {
      this.navCtrl.pop();
    }
    else {
      this.formSeq.previousStep();
    }
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
