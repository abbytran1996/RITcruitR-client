import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Events, ActionSheetController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import {
  StudentModel,
  MatchModel
} from '@app/models';

import {
  StudentService,
  HelperService,
  DataService
} from '@app/services';

//=========================================================================
// * StudentPhase3Page                                                   
//=========================================================================
// - Shows the matches in phase 3, the final phase.
// - Shows a list of all "final matches", each can be viewed individually
//   in more detail.
//_________________________________________________________________________
@Component({
  selector: 'page-student-phase-3',
  templateUrl: 'student-phase-3.html'
})
export class StudentPhase3Page {

  public student: StudentModel;
  public matchList: any;
  public pageLoading = true;
  public activeMatches = true;
  public detailMode = false;
  public reviewMode = false;
  public currentMatch: MatchModel;
  public matchPoints = { industry: false, locations: [false, false], skills: [] };
  public reviewStep = 0;
  public reviewStepMax = 5;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private studentService: StudentService,
    public dataService: DataService,
    public helperService: HelperService,
    private callNumber: CallNumber,
    public domSanitizer: DomSanitizer,
    public events: Events
  ) {
    this.student = navParams.get("student");
  }

  /*
    Called when this page is "entered".
    Get the list of phase 3 matches with the student model.
  */
  ionViewDidEnter() {
    this.pageLoading = true;
    this.getFinalMatches();
  }

  /*
    Called when the page is "left". Revert out of review mode if needed.
  */
  ionViewDidLeave() {
    this.detailMode = false;
    this.reviewMode = false;
    this.currentMatch = undefined;
    this.reviewStep = 0;
    this.activeMatches = true;
  }

  /*
    Called upon pulldown refresh, refresh the matches.
  */
  doRefresh(refresher) {
    if (this.activeMatches) {
      this.getFinalMatches(() => {
        refresher.complete();
      });
    }
    else {
      this.getArchivedMatches(() => {
        refresher.complete();
      });
    }
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
    Called when the match filter button is swiped in any direction. Determine threshold and call proper function.
  */
  swipeFilter(event) {
    if (this.activeMatches) {
      this.showArchivedMatches();
    }
    else {
      this.showFinalMatches();
    }
  }

  /*
    Show the action sheet.
  */
  showActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Match Filters',
      buttons: [
        {
          text: 'Final Matches',
          cssClass: (this.activeMatches) ? 'selected' : '',
          handler: () => {
            this.showFinalMatches();
          }
        }, {
          text: 'Archived Matches',
          cssClass: (this.activeMatches) ? '' : 'selected',
          handler: () => {
            this.showArchivedMatches();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
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

    if (this.activeMatches) {
      this.showFinalMatches();
    }
    else {
      this.showArchivedMatches();
    }
  }

  /*
    Show the review screens for the current match.
  */
  reviewMatch() {
    this.currentMatch.studentPresentationLinks = this.helperService.convertLinkTypes(this.currentMatch.studentPresentationLinks);
    this.currentMatch.job.presentationLinks = this.helperService.convertLinkTypes(this.currentMatch.job.presentationLinks);
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
            this.studentService.archiveMatch(match.id).subscribe(
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
    this.getFinalMatches();
    this.events.publish('tab:numMatches', this.student);
  }

  /*
    Start a call with the recruiter for the given match.
  */
  callRecruiter(match) {
    this.callNumber.callNumber(match.job.recruiter.phoneNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  /*
    Start an email with the recruiter for the given match.
  */
  emailRecruiter(match) {
    window.open(`mailto:${match.job.recruiter.contactEmail}`, '_system');
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
      "This statement is intended to give you a better idea of what the job is like day-to-day and provide what tasks and technologies are typically encountered."
    );
  }

  /*
    Show an alert dialog explaining what a student problem statement is.
  */
  yourProbStatementInfo() {
    this.showAlert(
      "Your Problem Statement",
      "Your problem statement is a short paragraph describing a project or problem you've worked on. Give recruiters an idea of the work you've done and what you like to do."
    );
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
    Open the given URL(link) in the browser.
  */
  openLink(link) {
    // Open browser app separately
    window.open(link, '_system', 'location=yes');
  }

  /*
    Get and show the final matches.
  */
  showFinalMatches() {
    if (!this.activeMatches) {
      this.activeMatches = true;
      this.pageLoading = true;
      this.getFinalMatches();
    }
  }

  /*
    Get and show the archived matches.
  */
  showArchivedMatches() {
    if (this.activeMatches) {
      this.activeMatches = false;
      this.pageLoading = true;
      this.getArchivedMatches();
    }
  }

  /*
    Get the list of "final" phase 3 matches for the current student.
  */
  getFinalMatches(callback?) {
    this.studentService.getFinalMatches(this.student.id).subscribe(
      data => {
        this.matchList = this.helperService.sortMatches(data);

        if (this.matchList != undefined && this.matchList.length > 0) {
          this.events.publish('tab:numMatches', this.student);

          this.pageLoading = false;
        }
        else {
          this.pageLoading = false;
        }

        if (callback != undefined) callback();
      },
      error => {
        console.log("Error getting final matches");
        console.log(error);
      }
    );
  }

  /*
    Get the list of archived matches for the current student
  */
  getArchivedMatches(callback?) {
    this.studentService.getArchivedMatches(this.student.id).subscribe(
      res => {
        this.matchList = res;
        this.pageLoading = false;

        if (callback != undefined) callback();
      },
      error => {
        console.log("Error getting archived matches");
        console.log(error);
      }
    );
  }

  /*
    Given a match, return the first mathing industry as a string.
    If no match found, returns the first industry of the match job.
  */
  getMatchedIndustry(match) {
    let industryMatch = match.job.company.industries[0];
    let matchFound = false;

    // Check if any preferred industries match
    this.student.preferredIndustries.forEach(industry => {
      if (match.job.company.industries.some(ind => ind === industry)) {
        if (!matchFound) {
          industryMatch = industry;
          matchFound = true;
        }
      }
    });

    return industryMatch;
  }

  /*
    Given a match, return the first mathing location as a string.
    If no match found, returns the first location of the match job.
  */
  getMatchedLocation(match) {
    let locationMatch = match.job.locations[0];
    let matchFound = false;

    // Check if any preferred locations match
    this.student.preferredLocations.forEach(location => {
      if (match.job.locations.some(loc => loc === location)) {
        if (!matchFound) {
          locationMatch = location;
          matchFound = true;
        }
      }
    });

    return locationMatch;
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
