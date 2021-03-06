import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Events, ToastController, AlertController, ModalController } from 'ionic-angular';

import { ProblemStatementAddModal } from '@app/pages/modals';

import {
  StudentModel,
  MatchModel,
  ProblemStatementModel
} from '@app/models';

import {
  StudentService,
  HelperService
} from '@app/services';

//=========================================================================
// * StudentPhase1Page
//=========================================================================
// - Shows any phase 1 matches that a student has. Each match is shown
//   one at a time on an easy to read "card". Students can declare if
//   they are interested in the matched job, or can decline it.
//   Any matched jobs that are "accepted" at this stage go to the
//   recruiter for the job.
//_________________________________________________________________________
@Component({
  selector: 'page-student-phase-1',
  templateUrl: 'student-phase-1.html'
})
export class StudentPhase1Page {

  public student: StudentModel;
  public match: MatchModel;
  public pageLoading = true;
  public firstLoad = false;

  // Match fields
  public matchList: any;
  public matchIndex = 0;
  public stage = 0;
  public maxStage = 2;

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

  // Problem statement fields
  @ViewChild('problemStatementForm') problemStatementForm;
  public existingStatementModel;
  public existingStatementOptions = [];
  public problemStatement: ProblemStatementModel = undefined;
  public hideEditBtn = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public events: Events,
    private studentService: StudentService,
    public helperService: HelperService
  ) {
    this.student = navParams.get("student");

    if (this.student == undefined) {
      this.events.subscribe('firstload:student', (student) => {
        this.firstLoad = true;
        this.student = student;
        this.existingStatementOptions = this.helperService.sortById(this.student.problemStatements, true);

        // Wait a bit longer for new account match generation.
        setTimeout(() => {
          this.getNewMatches();
          this.events.publish('tab:numMatches', this.student);
        }, 4000);
      });

      this.events.subscribe('tabs:student', (student) => {
        this.student = student;
        this.existingStatementOptions = this.helperService.sortById(this.student.problemStatements, true);
        this.getNewMatches();
      });
    }
  }

  /*
    Called when this page is "entered".
    Get the list of new matches with the student model.
  */
  ionViewDidEnter() {
    if (this.student != undefined && (this.matchList == undefined || this.matchList.length < 1)) {
      this.pageLoading = true;
      this.getNewMatches();
      this.existingStatementOptions = this.helperService.sortById(this.student.problemStatements, true);
    }
  }

  /*
    Called when this page is "exited".
    Unsubscribe from any declared events to avoid double triggering.
  */
  ionViewWillUnload() {
   this.events.unsubscribe("tabs:student");
   this.events.unsubscribe("firstload:student");
  }

  /*
    Called upon pulldown refresh, refresh the matches.
  */
  doRefresh(refresher) {
    this.getNewMatches(() => {
      refresher.complete();
    });
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
      "Your problem statement should be a short paragraph describing a project or problem you've worked on. Give recruiters an idea of the work you've done and what you like to do."
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
    Called when the value of the existing problem statement select box changes.
    Used to reset the field when "None" is selected. This is because Ionic
    for some reason doesn't allow deselecting of options in a select.
  */
  selectChanged() {
    if (this.existingStatementModel == -1) {
      this.existingStatementModel = undefined;
      this.problemStatementForm.reset();
      this.problemStatement = undefined;
    }
    else {
      this.problemStatement = new ProblemStatementModel(this.existingStatementModel);
      this.hideEditBtn = true;
    }
  }

  /*
    Called when creating a new custom problem statement.
    Show the new problem statement modal.
  */
  newStatement() {
    let modal = this.modalCtrl.create(ProblemStatementAddModal, {student: this.student});
    modal.onDidDismiss(data => {
      if (data) {
        this.problemStatement = new ProblemStatementModel(data);
      }
    });
    modal.present();
  }

  /*
    Called when editing a custom problem statement.
    Show the problem statement modal with the existing values.
  */
  editStatement() {
    let modal = this.modalCtrl.create(ProblemStatementAddModal, { statement: this.problemStatement });
    modal.onDidDismiss(data => {
      if (data) {
        this.problemStatement = data;
      }
    });
    modal.present();
  }

  /*
    Clears the currently set "new" problem statement.
  */
  clearStatement() {
    this.existingStatementModel = undefined;
    if (this.problemStatementForm != undefined) {
      this.problemStatementForm.reset();
    }
    this.hideEditBtn = false;
    this.problemStatement = undefined;
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
      if (this.problemStatement != undefined) {

        if (this.problemStatement) {
          this.match.studentProblemResponse = this.problemStatement.text;
        }
        else {
          this.match.studentProblemResponse = this.existingStatementModel.statement;
        }

        // API call to submit match with problem statement
        this.studentService.submitMatchProblemStatement(this.match.id, this.match.studentProblemResponse).subscribe(
          data => { },
          res => {
            this.clearStatement();
            this.events.publish('tab:numMatches', this.student);

            if (!res || res.status != 200) {
              console.log("Error submitting problem statement");
              console.log(res);
            }
          }
        );
        this.animateSuccess();
      }
      else {
        this.presentToast("Please enter a problem statement");
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
          this.clearStatement();
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
    Show the next match in the list of matches at this phase.
  */
  nextMatch() {
    this.matchList = this.helperService.removeFromArrayById(this.matchList, this.match);
    this.stage = 0;

    if (this.matchList.length > 0) {
      this.match = new MatchModel(this.matchList[this.matchIndex]);
    }
    else {
      this.match = undefined;
      this.pageLoading = true;
      this.getNewMatches();
    }

    this.fadeLeft = false;
    this.fadeRightInstant = true;
    this.pageLoading = false;
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
    Get the list of "new" unseen matches for the student.
  */
  getNewMatches(callback?) {
    this.studentService.getNewMatches(this.student.id).subscribe(
      data => {
        if (data == undefined || data.length == 0) {
          this.pageLoading = false;
        }
        else {
          this.matchList = this.helperService.sortMatches(data);
          this.matchIndex = 0;
          this.match = new MatchModel(this.matchList[this.matchIndex]);
          this.pageLoading = false;
        }

        this.events.publish('tab:numMatches', this.student);

        if (callback != undefined) callback();
      },
      error => {
        console.log("Error getting problem phase matches");
        console.log(error);
      }
    );
  }

  /*
    Shortcut to the skills edit screen when there are no matches.
  */
  editSkills() {
    this.events.publish('tab:editSkills', this.student);
  }

  /*
    Shortcut to the job preferences edit screen when there are no matches.
  */
  editPrefs() {
    this.events.publish('tab:editPrefs', this.student);
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
