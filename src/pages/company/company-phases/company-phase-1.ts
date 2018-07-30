import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';

import {
  RecruiterModel,
  JobModel,
  MatchModel
} from '@app/models';

import {
  JobPostingService,
  HelperService
} from '@app/services';

//=========================================================================
// * CompanyPhase1Page                                                   
//=========================================================================
// - Primary "dash" page for company. Shows all jobs with matches in
//   phase 1. Jobs can be viewed and matches can be accepted or declined.
//_________________________________________________________________________
@Component({
  selector: 'page-company-phase-1',
  templateUrl: 'company-phase-1.html'
})
export class CompanyPhase1Page {

  public recruiter: RecruiterModel;
  public currentJob: JobModel;
  public match: MatchModel;
  public pageLoading = true;
  
  // Match fields
  public matchList: any;
  public matchIndex = 0;
  public stage = 0;
  public maxStage = 1;

  // Match animation fields
  public fadeLeft = false;
  public fadeLeftInstant = false;
  public fadeRight = false;
  public fadeRightInstant = false;
  public matchSuccess = false;
  public matchSuccessFade = false;
  public matchSuccessTransform = false;
  public matchSuccessContentFade = false;
  public hideCard = false;
  public disableDecline = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private alertCtrl: AlertController,
    private jobPostingService: JobPostingService,
    public helperService: HelperService
  ) {
    this.recruiter = navParams.get("recruiter");
  }

  /*
    Called when this page is "entered". Subscribe to an event to retrieve
    the recruiter model after an async call in the parent tabs page.
  */
  ionViewDidEnter() {
    this.pageLoading = true;

    // Show the tabs bar now that we're in the main flow
    this.events.publish('tabs:setHidden', false, Date.now());

    if (this.recruiter != undefined) {
      this.getCurrentJob();
      this.getMatches();
    }
    else {
      this.events.subscribe('tabs:recruiter', (recruiter) => {
        this.recruiter = recruiter;
        this.getCurrentJob();
        this.getMatches();
      });
    }
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
    this.getMatches(() => {
      refresher.complete();
    });
  }

  /*
    Show an alert dialog explaining what a student problem statement is.
  */
  probStatementInfo() {
    this.showAlert(
      "Student Problem Statement",
      "The student problem statement is a short paragraph describing some project or problem the student has worked on. It's meant to give you an idea of the work the student has done."
    );
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
    Show the edit job screen for this job to update it.
  */
  editJob() {
    this.events.publish('tabs:editJob', this.currentJob, Date.now());
  }

  /*
    Called when the match card is swiped in any direction. Determine threshold and call proper function.
    backDecline or interested.
  */
  swipe(event) {
    if (event.direction == 4) { // swipe right
      if (this.stage > 0) {
        this.backDecline();
      }
    }
    if (event.direction == 2) { // swipe left
      if (this.stage < this.maxStage) {
        this.interested();
      }
    }
  }

  /*
    Called when the "Interested" button is tapped on a match card.
    Proceed to the next stage. If the last stage, submit the problem statement to the DB,
    then show the next match.
  */
  interested() {
    if (this.stage + 1 <= this.maxStage) {
      this.stage++;
    }
    else {
      // API call to submit match to the next phase
      this.jobPostingService.acceptMatch(this.match.id).subscribe(
        res => { },
        res => {
          this.events.publish('tabs:numMatches', this.currentJob);

          if (!res || res.status != 200) {
            console.log("Error approving problem phase");
            console.log(res);
          }
        }
      );
      this.animateSuccess();
    }
  }

  /*
    Called when the "Decline" button is tapped on a match card.
    If current stage is greater than 0, go to previous stage.
    If first stage, decline the current match, notify the DB and show the next match.
  */
  backDecline() {
    if (this.stage == 0) {
      this.jobPostingService.declineMatch(this.match.id).subscribe(
        data => { },
        res => {
          this.events.publish('tabs:numMatches', this.currentJob);

          if (!res || res.status != 200) {
            console.log("Error declining match");
            console.log(res);
          }
        }
      );

      this.fadeLeft = true;

      setTimeout(() => {
        this.nextMatch();

        setTimeout(() => {
          this.fadeRightInstant = false;
        }, 100);
      }, this.helperService.getCardFadeTime());
    }
    else {
      this.stage--;

      if (this.stage == 0) {
        this.disableDecline = true;
        setTimeout(() => {
          this.disableDecline = false;
        }, 800);
      }
    }
  }

  /*
    Show the next match in the list of matches at this phase.
  */
  nextMatch() {
    this.matchList = this.helperService.removeFromArrayById(this.matchList, this.match);
    this.stage = 0;
    this.match = new MatchModel(this.matchList[this.matchIndex]);

    this.fadeLeft = false;
    this.fadeRightInstant = true;
  }

  /*
    Show the match "success" animation.
    Animates a green checkmark circle to confirm the submission
    and acceptance of a match.
  */
  animateSuccess() {
    this.matchSuccess = true;

    setTimeout(() => {
      this.matchSuccessFade = true;
      this.matchSuccessTransform = true;
      this.hideCard = true;

      setTimeout(() => {
        this.hideCard = false;
        this.matchSuccessContentFade = true;
        this.fadeLeft = true;

        setTimeout(() => {
          this.stage = 0;
        }, this.helperService.getCardFadeTime() / 2);

        setTimeout(() => {
          this.nextMatch();

          setTimeout(() => {
            this.fadeRightInstant = false;
          }, 100);
        }, this.helperService.getCardFadeTime());

        setTimeout(() => {
          this.matchSuccessFade = false;
          this.matchSuccessContentFade = false;
          this.matchSuccessTransform = false;

          setTimeout(() => {
            this.matchSuccess = false;
          }, 200);
        }, 500);
      }, 100);
    }, 100);
  }

  /*
    Get the problem phase matches for this job.
  */
  getMatches(callback?) {
    this.jobPostingService.getProblemPhaseMatchesByJob(this.currentJob.id).subscribe(
      data => {
        this.matchList = this.helperService.sortMatches(data);

        this.events.publish('tabs:numMatches', this.currentJob);
        
        if (this.matchList != undefined && this.matchList.length > 0) {
          this.matchIndex = 0;
          this.stage = 0;
          this.match = new MatchModel(this.matchList[this.matchIndex]);
          this.pageLoading = false;
        }
        else {
          this.pageLoading = false;
        }

        if (callback != undefined) callback();
      },
      err => {
        console.log(err);
      }
    );
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
