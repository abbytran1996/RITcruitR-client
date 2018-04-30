import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, Events } from 'ionic-angular';

import { CompanyPhase1Page } from '../company-home/company-phase-1';
import { CompanyPhase2Page } from '../company-home/company-phase-2';
import { CompanyPhase3Page } from '../company-home/company-phase-3';
import { CompanyDetailsPage } from '../company-details/company-details';
import { CompanyJobCreate1Page } from '../company-job-create/company-job-create-1';
import { RecruiterContactPage } from '../recruiter-contact/recruiter-contact';
import { RecruiterRegisterPage } from '../recruiter-register/recruiter-register';

import { LoginPage } from '../login/login';

import { RecruiterModel } from '../../models/recruiter.model';

import { AuthService } from '../../app/services/auth.service';
import { RecruiterService } from '../../app/services/recruiter.service';

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

    if (this.recruiter != undefined) {
      this.recruiterTabParams = {recruiter: this.recruiter};
      this.loadingRecruiter = false;
    }
    else {
      let userEmail = window.localStorage.getItem("email");
      this.recruiterService.getRecruiterByEmail(userEmail).subscribe(
        data => {
          this.recruiter = RecruiterModel.createRecruiterFromApiData(data);
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
    Recruiter Nav Options
    ===========================================================================
  */

  // Create a job as a recruiter
  createCompanyJob() {
    this.navCtrl.push(CompanyJobCreate1Page, {recruiter: this.recruiter});
  }

  // Edit the details for a company
  editCompanyDetails() {
    this.navCtrl.push(CompanyDetailsPage, {recruiter: this.recruiter});
  }

  // Add a new recruiter to the company
  addRecruiter() {
    this.navCtrl.push(RecruiterRegisterPage, {recruiter: this.recruiter});
  }

  // Edit the recruiters in a company
  editRecruiters() {

  }

  // Edit the recruiters contact info
  editContact() {
    this.navCtrl.push(RecruiterContactPage, {recruiter: this.recruiter, edit: true});
  }

  // Logout the current user and return to the login screen.
  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, animation: "md-transition"});
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
