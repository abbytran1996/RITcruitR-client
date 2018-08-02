import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController, ActionSheetController } from 'ionic-angular';

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
  public activeJobs = true;
  public initialLoad = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private jobPostingService: JobPostingService,
    public helperService: HelperService
  ) {
    this.recruiter = navParams.get("recruiter");

    if (this.recruiter != undefined) {
      this.getActiveJobs();
    }
  }

  /*
    Called when this page is "entered". Subscribe to an event to retrieve
    the recruiter model after an async call in the parent tabs page.
  */
  ionViewDidEnter() {
    this.events.subscribe('tabs:recruiter', (recruiter) => {
      this.recruiter = recruiter;
      this.getActiveJobs();
    });

    if (!this.initialLoad && this.recruiter != undefined) {
      this.activeJobs = true;
      this.pageLoading = true;
      this.getActiveJobs();
    }

    // Hide the tabs bar on this page
    this.events.publish('tabs:setHidden', true, Date.now());
    this.initialLoad = false;
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
    if (this.activeJobs) {
      this.getActiveJobs(() => {
        refresher.complete();
      });
    }
    else {
      this.getInactiveJobs(() => {
        refresher.complete();
      });
    }
  }

  /*
    Called when the jobs filter button is swiped in any direction. Determine threshold and call proper function.
  */
  swipe(event) {
    if (this.activeJobs) {
      this.showInactiveJobs();
    }
    else {
      this.showActiveJobs();
    }
  }

  /*
    Show the action sheet.
  */
  showActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Job Filters',
      buttons: [
        {
          text: 'Active Jobs',
          cssClass: (this.activeJobs) ? 'selected' : '',
          handler: () => {
            this.showActiveJobs();
          }
        }, {
          text: 'Inactive Jobs',
          cssClass: (this.activeJobs) ? '' : 'selected',
          handler: () => {
            this.showInactiveJobs();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });

    actionSheet.present();
  }

  /*
    Get and show the active jobs.
  */
  showActiveJobs() {
    if (!this.activeJobs) {
      this.activeJobs = true;
      this.pageLoading = true;
      this.getActiveJobs();
    }
  }

  /*
    Get and show the inactive jobs.
  */
  showInactiveJobs() {
    if (this.activeJobs) {
      this.activeJobs = false;
      this.pageLoading = true;
      this.getInactiveJobs();
    }
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
          handler: () => { }
        },
        {
          text: 'Deactivate',
          handler: () => {
            this.jobPostingService.deactivateJob(job.id).subscribe(
              data => { },
              res => {
                this.pageLoading = true;
                this.getActiveJobs();
              }
            );
          }
        }
      ]
    });

    alert.present();
  }

  /*
    Reactivate the given job.
  */
  reactivateJob(job) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Job Reactivation',
      message: 'Would you like to reactivate this job? If so, it will be matchable again and have its duration reset.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Reactivate',
          handler: () => {
            this.jobPostingService.reactivateJob(job.id).subscribe(
              data => { },
              res => {
                this.pageLoading = true;
                this.getInactiveJobs();
              }
            );
          }
        }
      ]
    });

    alert.present();
  }

  /*
    Get all company jobs that have a status of active.
  */
  getActiveJobs(callback?) {
    this.jobPostingService.getActiveJobsByCompany(this.recruiter.company.id).subscribe(
      data => {
        this.jobList = this.helperService.sortJobs(data);

        if (this.jobList.length == 0) {
          this.pageLoading = false;
        }

        // Get the match count for each job
        this.jobList.forEach((job, index) => {
          this.jobPostingService.getNumAllMatches(job.id).subscribe(
            data => {
              this.jobList[index]["numMatches"] = data || 0;
            },
            res => { }
          );
        });

        this.pageLoading = false;

        if (callback != undefined) callback();
      },
      err => {
        console.log(err);
      }
    );
  }

  /*
    Get all company jobs that have a status of inactive.
  */
  getInactiveJobs(callback?) {
    this.jobPostingService.getInactiveJobsByCompany(this.recruiter.company.id).subscribe(
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
    if (!this.activeJobs) return;
    
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
