import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, AlertController, Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { PresentationLinkAddModal } from '@app/pages/modals';

import { 
  StudentModel,
  MatchModel
} from '@app/models';

import {
  StudentService,
  HelperService
} from '@app/services';

//=========================================================================
// * StudentPhase2Page                                                   
//=========================================================================
// - Shows any phase 2 matches that a student has. Each match is shown
//   one at a time on an easy to read "card". Students can declare if
//   they are interested in the matched job, or can decline it.
//   Any matched jobs that are "accepted" at this stage go to the
//   recruiter for the job.
//_________________________________________________________________________
@Component({
  selector: 'page-student-phase-2',
  templateUrl: 'student-phase-2.html'
})
export class StudentPhase2Page {

  public student: StudentModel;
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

  // Video variables
  public browser;

  // Reorder list of presentation links
  public linksList = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private studentService: StudentService,
    public helperService: HelperService,
    private iab: InAppBrowser,
    public events: Events
  ) {
    this.student = navParams.get("student");
  }

  /*
    Called when this page is "entered".
    Get the list of phase 2 matches with the student model.
  */
  ionViewDidEnter() {
    if (this.matchList == undefined || this.matchList.length < 1) {
      this.pageLoading = true;
      this.getPhase2Matches();
    }
  }

  /*
    Called upon pulldown refresh, refresh the matches.
  */
  doRefresh(refresher) {
    this.getPhase2Matches(() => {
      refresher.complete();
    });
  }

  /*
    Show an alert dialog explaining what a company presentation phase is.
  */
  companyPresentationInfo() {
    this.showAlert(
      "Company Presentation",
      "Take a look at these links to see what the company offering the job is all about. A link could be to a company video, website, project repository, or anything they'd like you to see. Tap a link to open it."
    );
  }

  /*
    Show an alert dialog explaining what a student presentation phase is.
  */
  yourPresentationInfo() {
    this.showAlert(
      "Your Presentation",
      "This is your chance to show the recruiter anything of yours that you would like to share. This could be a link to a video of yourself, a project link, a personal website, or anything else."
    );
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
    Proceed to the next stage. If on the last stage, submit the presentation
    phase and "accept" the match, then show the next match.
  */
  interested() {
    if (this.stage + 1 <= this.maxStage) {
      this.stage++;
    }
    else {
      if (this.linksList && this.linksList.length > 0 && this.linksList.length <= 3) {
        this.match.studentPresentationLinks = this.linksList;

        // API call to submit match with presentation links
        this.studentService.submitMatchPresentationPhase(this.match.id, this.match.studentPresentationLinks).subscribe(
          res => { },
          res => {
            this.linksList = [];
            this.events.publish('tab:numMatches', this.student);

            if (!res || res.status != 200) {
              console.log("Error submitting presentation links");
              console.log(res);
            }
          }
        );
        this.animateSuccess();
      }
      else {
        this.presentToast("Please add at least one, and at most three presentation link(s) for the recruiter to view.");
      }
    }
  }

  /*
    Called when the "Decline" button is tapped on a match card.
    If current stage is greater than 0, go to previous stage.
    If first stage, decline the current match, notify the DB and show the next match.
  */
  backDecline() {
    if (this.stage == 0) {
      this.studentService.declineMatch(this.match.id).subscribe(
        data => { },
        res => {
          this.linksList = [];
          this.events.publish('tab:numMatches', this.student);

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
    Show the next match in the match list of this phase.
  */
  nextMatch() {
    this.matchList = this.helperService.removeFromArrayById(this.matchList, this.match);
    this.stage = 0;
    this.match = new MatchModel(this.matchList[this.matchIndex]);
    this.prepMatch();

    this.fadeLeft = false;
    this.fadeRightInstant = true;
  }

  /*
    Open the given URL(link) in the browser.
  */
  openLink(link) {
    // Open browser app separately
    window.open(link, '_system', 'location=yes');
  }

  /*
    Remove the presentation link at the given index from the list of ones
    for the current match.
  */
  removeLink(index) {
    this.linksList.splice(index, 1);
  }

  /*
    Called when adding a new presentation link to the current match.
    Show the new presentation list modal.
  */
  addLink() {
    let modal = this.modalCtrl.create(PresentationLinkAddModal, { model: this.student });
    modal.onDidDismiss(data => {
      if (data) {
        this.linksList.push(data);
      }
    });
    modal.present();
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
    Get the list of phase 2 matches for the student.
  */
  getPhase2Matches(callback?) {
    this.studentService.getPhase2Matches(this.student.id).subscribe(
      data => {
        this.matchList = this.helperService.sortMatches(data);

        if (this.matchList != undefined && this.matchList.length > 0) {
          this.events.publish('tab:numMatches', this.student);

          this.matchIndex = 0;
          this.match = new MatchModel(this.matchList[this.matchIndex]);
          this.prepMatch();
          this.pageLoading = false;
        }
        else {
          this.pageLoading = false;
        }

        if (callback != undefined) callback();
      },
      error => {
        console.log("Error getting presentation phase matches");
        console.log(error);
      }
    );
  }

  /*
    Prepare the current match for the view. Gathers data and sets flags based on matched
    preferences to show match indicators on the match card. Thisa only matches industries.
  */
  prepMatch() {
    // Set the current match to the current index
    this.match = new MatchModel(this.matchList[this.matchIndex]);

    // No matches in this phase, nothing to prep
    if (this.match == undefined) {
      return;
    }

    let matchPoints = { industry: false };

    // Check if any preferred industries match
    this.student.preferredIndustries.forEach(industry => {
      if (this.match.job.company.industries.some(ind => ind === industry)) {
        if (!matchPoints.industry) {
          this.match["matchedIndustry"] = industry;
          matchPoints.industry = true;
        }
      }
    });

    this.pageLoading = false;
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
