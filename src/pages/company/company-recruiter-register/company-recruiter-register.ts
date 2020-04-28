import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  CompanyRegisterModel,
  RecruiterRegisterModel,
  RecruiterContactModel,
  RecruiterModel,
  UserModel
} from '@app/models';

import { CompanyRegisterConfirmPage, CompanyTabsPage } from '@app/pages/company';

import {
  FormSequenceService,
  DataService,
  RecruiterService,
  CompanyService,
  AuthService,
  HelperService
} from '@app/services';

//=========================================================================
// * CompanyRecruiterRegisterPage
//=========================================================================
// - Page to register a new company and a new recruiter.
// - Multi-step form sequence, contains steps for company registration
//   and recruiter registration, can be initiated at any point to
//   access one step.
//_________________________________________________________________________
@Component({
  selector: 'page-company-recruiter-register',
  templateUrl: 'company-recruiter-register.html'
})
export class CompanyRecruiterRegisterPage {

  // Step 0 variables
  @ViewChild('form0') form0;
  public companyModel = new CompanyRegisterModel();
  industryOptions = [];

  // Step 1 variables
  @ViewChild('form1') form1;
  locationOptions = [];
  companySizeOptions = [];

  // Step 2 variables
  @ViewChild('form2') form2;
  public recruiterModel = new RecruiterRegisterModel();

  // Step 3 variables
  @ViewChild('form3') form3;
  public contactModel = new RecruiterContactModel();

  // Implementation specific variables
  public saving = false;
  public addRecruiter = false;
  public editContact = false;
  public currentRecruiter: RecruiterModel;
  public loading = true;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public formSeq: FormSequenceService,
    public dataService: DataService,
    private companyService: CompanyService,
    private recruiterService: RecruiterService,
    private authService: AuthService,
    private helperService: HelperService
  ) {
    this.addRecruiter = navParams.get("addRecruiter") || false;
    this.editContact = navParams.get("editContact") || false;
    this.currentRecruiter = navParams.get("recruiter");

    this.formSeq.reset();
    this.formSeq.startStep = navParams.get("startStep") || 0;
    this.formSeq.currentStep = this.formSeq.startStep;
    this.formSeq.formTitles = [
      "Company Information",
      "Company Information",
      "Add Recruiter",
      "Recruiter Contact"
    ];
    this.formSeq.formErrorMessages = [
      "Please enter your company name and select any industries it operates in",
      "Please enter your company locations, size, and website",
      "Please enter a valid email, password, first name, and last name",
      "Please enter a contact email and a phone number"
    ];

    // Get the data for the select fields
    this.dataService.getIndustries().subscribe(
      resData => {
        this.industryOptions = resData;
      },
      res => { }
    );
    this.locationOptions = this.dataService.getLocations();
    this.companySizeOptions = this.dataService.getCompanySizesForCompany();

    if (this.editContact) {
      this.contactModel.phoneNumber = this.currentRecruiter.phoneNumber;
      this.contactModel.contactEmail = this.currentRecruiter.contactEmail;
    }
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
    this.loading = false;
  }

  /*
    Continue to the next step of company registration.
  */
  continueClicked() {
    if (this.formSeq.switchingStep) return;

    if (this.formSeq.currentForm && this.formSeq.currentForm.valid) {

      // At step 2 (recruiter registration, perform password validation)
      if (this.formSeq.currentStep == 2) {
        let pwdVal = this.helperService.validatePassword(this.recruiterModel.password);
        if (pwdVal != true) {
          this.presentToast(pwdVal);
          this.loading = false;
          return;
        }
      }

      if (this.formSeq.currentStep == this.formSeq.maxSteps) {
        this.saving = true;

        if (this.addRecruiter) {
          this.recruiterModel.passwordConfirm = this.recruiterModel.password;
          this.recruiterModel.phoneNumber = this.contactModel.phoneNumber;
          this.recruiterModel.contactEmail = this.contactModel.contactEmail;

          /*
            Create the recruiter for the company
            =================================================================
          */
          this.recruiterService.addRecruiter(this.currentRecruiter.company.id, this.recruiterModel).subscribe(
            recruiterData => {
              this.saving = false;
              this.navCtrl.pop();
            },

            // Recruiter create error
            error => {
              console.log(error);
              this.presentToast("There was an error registering the recruiter for your company, please try again");
              this.saving = false;
            }
          );
        }
        else if (this.editContact) {
          this.currentRecruiter.phoneNumber = this.contactModel.phoneNumber;
          this.currentRecruiter.contactEmail = this.contactModel.contactEmail;

          /*
            Update the recruiter contact info
            =================================================================
          */
          this.recruiterService.updateRecruiter(this.currentRecruiter).subscribe(
            data => {},

            // Recruiter create error
            res => {
              this.saving = false;
              this.navCtrl.setRoot(CompanyTabsPage, { recruiter: this.currentRecruiter, message: "Contact information updated successfully" });
            }
          );
        }
        else {
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

                  /*
                    Make the new recruiter the primary recruiter
                    =================================================================
                  */
                  this.recruiterService.makePrimaryRecruiter(recruiter.id).subscribe(
                    resData => {
                    },
                    res => {
                      this.saving = false;
                      this.navCtrl.push(CompanyRegisterConfirmPage, { fromLogin: false });
                    }
                  );
                },

                // Recruiter create error
                error => {
                  console.log(error);
                  this.presentToast("There was an error registering the recruiter for your company, please try again");
                  this.saving = false;
                }
              );
            },

            // Company create error
            error => {
              console.log(error);
              this.presentToast("A company is already registered by that name, please contact our support team to report fraudulant companies");
              this.saving = false;
            }
          );
        }
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
    if (this.formSeq.switchingStep) return;
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
