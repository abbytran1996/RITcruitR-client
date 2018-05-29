import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, Events } from 'ionic-angular';

import {
  CompanyPhase1Page,
  CompanyPhase2Page,
  CompanyPhase3Page,
  CompanyDetailsPage,
  CompanyJobCreate1Page,
  RecruiterContactPage,
  RecruiterRegisterPage,
  CompanyPresentationLinksPage
} from '@app/pages/company';

import { LoginPage } from '@app/pages/general';

import { RecruiterModel } from '@app/models';

import {
  AuthService,
  RecruiterService
} from '@app/services';

//=========================================================================
// * CompanyTabsPage
//=========================================================================
// - Main "dashboard" parent page. Contains tabs and side drawer navigation
//   to navigate to anywhere in the app.
// - Shows CompanyPhase1Page initially.
//_________________________________________________________________________
@Component({
  selector: 'page-company-tabs',
  templateUrl: 'company-tabs.html'
})
export class CompanyTabsPage {

  // Company tab pages
  public companyPhase1Tab = CompanyPhase1Page;
  public companyPhase2Tab = CompanyPhase2Page;
  public companyPhase3Tab = CompanyPhase3Page;
  public recruiterTabParams: any;

  // User data
  public recruiter: RecruiterModel;
  public loadingRecruiter = true;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private authService: AuthService,
    private recruiterService: RecruiterService,
    public events: Events
  ) {
    this.recruiter = navParams.get("recruiter");

    // If recruiter is sent in from previous page, use it, otherwise get the recruiter from the DB.
    if (this.recruiter != undefined) {
      this.recruiterTabParams = {recruiter: this.recruiter};
      this.loadingRecruiter = false;
    }
    else {
      let userEmail = window.localStorage.getItem("email");
      this.recruiterService.getRecruiterByEmail(userEmail).subscribe(
        data => {
          this.recruiter = new RecruiterModel(data);
          this.recruiterTabParams = {recruiter: this.recruiter};
          this.events.publish('tabs:recruiter', this.recruiter, Date.now());
          this.loadingRecruiter = false;
        },
        error => {
          this.presentToast("An error occurred loading your account, please try again later");
        }
      );
    }

    // If a message was sent with nav params, show it.
    let message = navParams.get("message");
    if (message) {
      this.presentToast(message);
    }
  }

  /*
    Create a job as a recruiter.
  */
  createCompanyJob() {
    this.navCtrl.push(CompanyJobCreate1Page, {recruiter: this.recruiter});
  }

  /*
    Edit the company's saved presentation links.
  */
  editPresentationLinks() {
    this.navCtrl.push(CompanyPresentationLinksPage, { recruiter: this.recruiter });
  }

  /*
    Edit the details for a company.
  */
  editCompanyDetails() {
    this.navCtrl.push(CompanyDetailsPage, {recruiter: this.recruiter});
  }

  /*
    Add a new recruiter to the company.
  */
  addRecruiter() {
    this.navCtrl.push(RecruiterRegisterPage, {recruiter: this.recruiter});
  }

  /*
    Edit the recruiters in a company.
  */
  editRecruiters() {

  }

  /*
    Edit the recruiters contact info.
  */
  editContact() {
    this.navCtrl.push(RecruiterContactPage, {recruiter: this.recruiter, edit: true});
  }

  /*
    Logout the current user and return to the login screen..
  */
  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, animation: "md-transition"});
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
