import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, Events, Tabs } from 'ionic-angular';

import {
  CompanyJobMatchesPage,
  CompanyPhase1Page,
  CompanyPhase2Page,
  CompanyPhase3Page,
  CompanyDetailsPage,
  CompanyJobCreatePage,
  CompanyRecruiterRegisterPage,
  CompanyPresentationLinksPage
} from '@app/pages/company';

import { LoginPage } from '@app/pages/general';

import { RecruiterModel } from '@app/models';

import {
  AuthService,
  RecruiterService,
  JobPostingService
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
  public companyJobMatchesTab = CompanyJobMatchesPage;
  public companyPhase1Tab = CompanyPhase1Page;
  public companyPhase2Tab = CompanyPhase2Page;
  public companyPhase3Tab = CompanyPhase3Page;
  public recruiterTabParams: any;

  public numPhase1Matches;
  public numPhase2Matches;
  public numFinalMatches;

  // User data
  public recruiter: RecruiterModel;
  public loadingRecruiter = true;

  @ViewChild('companyTabs') tabRef: Tabs;
  public hideTabBar = true;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private authService: AuthService,
    private recruiterService: RecruiterService,
    private jobPostingService: JobPostingService,
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
          this.recruiter.primary = (AuthService.PRIMARY_RECRUITER == authService.getUserRole(this.recruiter.user));

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
    Called when this view is entered, subscribe to events.
  */
  ionViewDidEnter() {
    this.events.subscribe('tabs:setHidden', (flag) => {
      this.setHideTabBar(flag);
    });

    this.events.subscribe('tabs:setActive', (tabIndex) => {
      this.setActiveTab(tabIndex);
    });

    this.events.subscribe('tabs:createJob', (recruiter) => {
      this.createCompanyJob();
    });

    this.events.subscribe('tabs:editJob', (job) => {
      this.editCompanyJob(job);
    });

    this.events.subscribe('tabs:importJob', (recruiter) => {
      // TODO: Call job import
    });

    this.events.subscribe('tabs:numMatches', (job) => {
      this.getNumMatches(job);
    });
  }

  /*
    Called when this view is left, unsubscribe to events.
  */
  ionViewDidLeave() {
    this.events.unsubscribe("tabs:setHidden");
    this.events.unsubscribe("tabs:setActive");
    this.events.unsubscribe("tabs:createJob");
    this.events.unsubscribe("tabs:importJob");
    this.events.unsubscribe("tabs:editJob");
    this.events.unsubscribe("tabs:numMatches");
  }

  /*
    Get the number of macthes in each phase.
  */
  getNumMatches(job) {
    // Get phase 1 num
    this.jobPostingService.getNumPhase1Matches(job.id).subscribe(
      data1 => {
        this.numPhase1Matches = data1;

        // Get phase 2 num
        this.jobPostingService.getNumPhase2Matches(job.id).subscribe(
          data2 => {
            this.numPhase2Matches = data2;

            // Get final phase num
            this.jobPostingService.getNumFinalMatches(job.id).subscribe(
              data3 => {
                this.numFinalMatches = data3;
              }, res => { }
            );
          }, res => { }
        );
      }, res => { }
    );
  }

  /*
    Set the boolean to hide the tab bar or not.
  */
  setHideTabBar(flag) {
    this.hideTabBar = flag;
  }

  setActiveTab(tabIndex) {
    this.tabRef.select(tabIndex);

    if (tabIndex == 0) {
      this.numPhase1Matches = undefined;
      this.numPhase2Matches = undefined;
      this.numFinalMatches = undefined;
    }
  }

  /*
    Create a job as a recruiter.
  */
  createCompanyJob() {
    this.navCtrl.push(CompanyJobCreatePage, {recruiter: this.recruiter});
  }

  /*
    Edit a job as a recruiter.
  */
  editCompanyJob(job) {
    this.navCtrl.push(CompanyJobCreatePage, { recruiter: this.recruiter, job: job });
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
    this.navCtrl.push(CompanyRecruiterRegisterPage, {recruiter: this.recruiter, startStep: 2, addRecruiter: true});
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
    this.navCtrl.push(CompanyRecruiterRegisterPage, { recruiter: this.recruiter, startStep: 3, editContact: true });
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
