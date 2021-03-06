import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import {
  RecruiterModel,
  JobModel,
  MatchModel,
  PresentationLinkModel
} from '@app/models';

import {
  JobPostingService,
  HelperService,
  DataService
} from '@app/services';

//=========================================================================
// * CompanyPhase2Page                                                   
//=========================================================================
// - Company match phase 2 page. Shows all jobs with matches in
//   phase 2. Jobs can be viewed and matches can be accepted or declined.
//_________________________________________________________________________
@Component({
  selector: 'page-company-phase-2',
  templateUrl: 'company-phase-2.html'
})
export class CompanyPhase2Page {

  public recruiter: RecruiterModel;
  public currentJob: JobModel;
  public match: MatchModel;
  public displayLinks: Array<PresentationLinkModel>;
  public pageLoading = true;

  // Match fields
  public matchList: any;
  public matchIndex = 0;
  public stage = 0;
  public maxStage = 0;

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
    public helperService: HelperService,
    public dataService: DataService,
    public domSanitizer: DomSanitizer
  ) {
    this.recruiter = navParams.get("recruiter");
  }

  /*
    Called when this page is "entered". Load the list of matches and get the job.
  */
  ionViewDidEnter() {
    if (this.matchList == undefined || this.matchList.length < 1) {
      this.pageLoading = true;
      this.getCurrentJob();
      this.getMatches();
    }
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
    Show an alert dialog explaining what a student presentation phase is.
  */
  presentationInfo() {
    this.showAlert(
      "Student Presentation",
      "This is the student's chance to provide anything interesting to share. This could be a link to a video of the student, a project link, a personal website, or anything else. Tap a link to open it."
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
    Open the given URL(link) in the browser.
  */
  openLink(link) {
    // Open browser app separately
    window.open(link, '_system', 'location=yes');
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
        data => { },
        res => {
          this.events.publish('tabs:numMatches', this.currentJob);

          if (!res || res.status != 200) {
            console.log("Error approving presentation phase");
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
    
    if (this.matchList.length > 0) {
      this.match = new MatchModel(this.matchList[this.matchIndex]);
      this.displayLinks = this.helperService.convertLinkTypes(this.match.job.presentationLinks);
    }
    else {
      this.match = undefined;
      this.displayLinks = undefined;
      this.pageLoading = true;
      this.getMatches();
    }

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
    Get the presentation phase matches for this job.
  */
  getMatches(callback?) {
    this.jobPostingService.getPresentationPhaseMatchesByJob(this.currentJob.id).subscribe(
      data => {
        if (data == undefined || data.length == 0) {
          this.pageLoading = false;
        }
        else {
          this.matchList = this.helperService.sortMatches(data);
          this.matchIndex = 0;
          this.stage = 0;
          this.match = new MatchModel(this.matchList[this.matchIndex], false);
          this.displayLinks = this.helperService.convertLinkTypes(this.match.studentPresentationLinks);
          this.pageLoading = false;
        }

        this.events.publish('tabs:numMatches', this.currentJob);

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
