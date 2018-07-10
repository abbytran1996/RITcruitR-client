import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

import {
  RecruiterModel,
  MatchModel,
  JobModel
} from '@app/models';

import {
  JobPostingService,
  HelperService
} from '@app/services';

//=========================================================================
// * CompanyPhase3Page                                                   
//=========================================================================
// - Company match phase 3 page. Shows all jobs with matches in
//   phase 3. Jobs can be viewed and matches for the job can be reviewed.
//_________________________________________________________________________
@Component({
  selector: 'page-company-phase-3',
  templateUrl: 'company-phase-3.html'
})
export class CompanyPhase3Page {

  public recruiter: RecruiterModel;
  public currentJob: JobModel;
  public matchList: any;
  public pageLoading = true;
  public detailMode = false;
  public reviewMode = false;
  public currentMatch: MatchModel;
  public reviewStep = 0;
  public reviewStepMax = 5;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private jobPostingService: JobPostingService,
    public helperService: HelperService,
    private callNumber: CallNumber,
    public events: Events
  ) {
    this.recruiter = navParams.get("recruiter");
  }

  /*
    Called when this page is "entered".
    Get the list of phase 3 matches with the job model.
  */
  ionViewDidEnter() {
    this.pageLoading = true;
    this.getCurrentJob();
    this.getMatches();
  }

  /*
    Called when the page is "left". Revert out of review mode if needed.
  */
  ionViewDidLeave() {
    this.detailMode = false;
    this.reviewMode = false;
    this.currentMatch = undefined;
    this.reviewStep = 0;
  }

  /*
    Called upon pulldown refresh, refresh the matches.
  */
  doRefresh(refresher) {
    this.getMatches(() => {
      refresher.complete();
    });
  }

  /*
    Called to initialize the page with the needed current job.
  */
  getCurrentJob() {
    this.currentJob = this.jobPostingService.getCurrentJob();
  }

  /*
    Navigate back to the list of jobs.
  */
  backToJobs() {
    this.events.publish('tabs:setActive', 0, Date.now());
    this.events.publish('tabs:setHidden', true, Date.now());
  }

  /*
    Called when the match card is swiped in any direction. Determine threshold and call proper function.
    backDecline or interested.
  */
  swipe(event) {
    if (event.direction == 4) { // swipe right
      if (this.reviewStep > 0) {
        this.cardPrev();
      }
    }
    if (event.direction == 2) { // swipe left
      if (this.reviewStep < this.reviewStepMax) {
        this.cardNext();
      }
    }
  }

  /*
    Show the match detail screen for the match that was clicked.
  */
  matchDetails(match) {
    this.currentMatch = new MatchModel(match);
    this.detailMode = true;
    this.reviewStep = 0;
  }

  /*
    Show the final match list.
  */
  backToList() {
    this.currentMatch = undefined;
    this.detailMode = false;
    this.reviewMode = false;
    this.reviewStep = 0;
    this.getMatches();
  }

  /*
    Show the review screens for the current match.
  */
  reviewMatch() {
    this.reviewMode = true;
    this.reviewStep = 0;
  }

  /*
    Show the contact information for this match.
  */
  showContact() {
    this.reviewMode = false;
  }

  /*
    Archive the current match.
  */
  archiveMatch(match) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Archive',
      message: 'Are you sure you want to archive this match?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Archive',
          handler: () => {
            this.jobPostingService.archiveMatch(match.id).subscribe(
              data => {
                this.postArchive();
              },
              res => {
                this.postArchive();
              }
            );
          }
        }
      ]
    });

    alert.present();
  }

  /*
    Actions to perform after archiving.
  */
  postArchive() {
    this.backToList();
    this.getMatches();
    this.events.publish('tabs:numMatches', this.currentJob);
  }

  /*
    Start a call with the student for the given match.
  */
  callStudent(match) {
    this.callNumber.callNumber(match.student.phoneNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  /*
    Start an email with the student for the given match.
  */
  emailStudent(match) {
    window.open(`mailto:${match.student.contactEmail}`, '_system');
  }

  /*
    Show the previous match review step.
  */
  cardPrev() {
    if (this.reviewStep > 0) {
      this.reviewStep--;
    }
  }

  /*
    Show the next match review step.
  */
  cardNext() {
    if (this.reviewStep < this.reviewStepMax) {
      this.reviewStep++;
    }
  }

  /*
    Show an alert dialog explaining what a company's problem statement is.
  */
  companyProbStatementInfo() {
    this.showAlert(
      "Job Problem Statement",
      "This statement is intended to give the student a better idea of what the job is like day-to-day and provide insight into what tasks and technologies are typically encountered."
    );
  }

  /*
    Show an alert dialog explaining what a student problem statement is.
  */
  studentProbStatementInfo() {
    this.showAlert(
      "Student Problem Statement",
      "The student problem statement is a short paragraph describing some project or problem the student has worked on. It's meant to give you an idea of the work the student has done."
    );
  }

  /*
    Show an alert dialog explaining what a company presentation phase is.
  */
  companyPresentationInfo() {
    this.showAlert(
      "Company Presentation",
      "These are the links provided during job creation to showcase aspects of the company and the position being applied for. Tap a link to open it."
    );
  }

  /*
    Show an alert dialog explaining what a student presentation phase is.
  */
  studentPresentationInfo() {
    this.showAlert(
      "Student Presentation",
      "This is the student's chance to provide anything interesting to share. This could be a link to a video of the student, a project link, a personal website, or anything else. Tap a link to open it."
    );
  }

  /*
    Open the given URL(link) in the browser.
  */
  openLink(link) {
    // Open browser app separately
    window.open(link, '_system', 'location=yes');
  }

  /*
    Get the list of "final" phase 3 matches for the current job.
  */
  getMatches(callback?) {
    this.jobPostingService.getFinalPhaseMatchesByJob(this.currentJob.id).subscribe(
      data => {
        this.matchList = this.helperService.sortMatches(data);

        this.events.publish('tabs:numMatches', this.currentJob);
        this.pageLoading = false;

        if (callback != undefined) callback();
      },
      error => {
        console.log("Error getting final matches");
        console.log(error);
      }
    );
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

  /*
    Show an alert dialog with the given title and message.
  */
  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
