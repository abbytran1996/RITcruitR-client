import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';

import {
  CompanyPhase1Page
} from '@app/pages/company';

import { RecruiterModel } from '@app/models';

import {
  JobPostingService,
  HelperService
} from '@app/services';

//=========================================================================
// * CompanyJobMatchesPage                                                   
//=========================================================================
// - Primary "dash" page for company. Shows all jobs.
//   Jobs can be viewed and matches can be accepted or declined.
//_________________________________________________________________________
@Component({
  selector: 'page-company-job-matches',
  templateUrl: 'company-job-matches.html'
})
export class CompanyJobMatchesPage {

  public recruiter: RecruiterModel;
  public jobList = [];
  public pageLoading = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private alertCtrl: AlertController,
    private jobPostingService: JobPostingService,
    public helperService: HelperService
  ) {
    this.recruiter = navParams.get("recruiter");

    if (this.recruiter != undefined) {
      this.getOpenJobs();
    }
  }

  /*
    Called when this page is "entered". Subscribe to an event to retrieve
    the recruiter model after an async call in the parent tabs page.
  */
  ionViewDidEnter() {
    this.events.subscribe('tabs:recruiter', (recruiter) => {
      this.recruiter = recruiter;
      this.getOpenJobs();
    });

    // Hide the tabs bar on this page
    this.events.publish('tabs:setHidden', true, Date.now());
  }

  /*
    Called when this page is "exited". Unsubscribe to events.
  */
  ionViewDidLeave() {
   this.events.unsubscribe("tabs:recruiter");
  }

  /*
    Called upon pulldown refresh, refresh the matches.
  */
  doRefresh(refresher) {
    this.getOpenJobs(() => {
      refresher.complete();
    });
  }

  /*
    Open up the given job in the job editor.
  */
  editJob(job) {
    this.events.publish('tabs:editJob', job, Date.now());
  }

  /*
    Deactivate the given job.
  */
  deactivateJob(job) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Job Deactivation',
      message: 'Are you sure you want to deactivate this job? It can be reactivated later.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Deactivate',
          handler: () => {
            // TODO: Deactivate job when the server is updated to do so
            this.jobList = this.helperService.removeFromArrayById(this.jobList, job);
          }
        }
      ]
    });

    alert.present();
  }

  /*
    Get all company jobs that have a status of open.
  */
  getOpenJobs(callback?) {
    this.jobPostingService.getOpenJobsByCompany(this.recruiter.company.id).subscribe(
      data => {
        this.jobList = data;
        this.pageLoading = false;

        if (callback != undefined) callback();
      },
      err => {
        console.log(err);
      }
    );
  }

  /*
    View matches in the main flow for the selected job.
  */
  viewJobMatches(job) {
    this.events.publish('tabs:setActive', 1, Date.now());
    this.jobPostingService.setCurrentJob(job);
  }

  /*
    Push the create job page to begin job creation process.
  */
  createJobLink() {
    this.events.publish('tabs:createJob', this.recruiter);
  }

  /*
    Push the import job page to begin job import process.
  */
  importJobLink() {
    this.events.publish('tabs:importJob', this.recruiter);
  }
}
