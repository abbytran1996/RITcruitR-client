import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, ToastController, AlertController, ModalController } from 'ionic-angular';

import { ProblemStatementAddModal } from '@app/pages/modals';

import {
  StudentModel,
  MatchModel
} from '@app/models';

import { StudentService } from '@app/services';

const fadeTime = 400;

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

  // Match fields
  public matchList: any;
  public matchIndex = 0;
  public matchPoints = {industry: false, locations: [false, false], skills: []};
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

  // Problem statement fields
  @ViewChild('problemStatementForm') problemStatementForm;
  public existingStatementModel;
  public existingStatementOptions = [];
  public problemStatement = undefined;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public events: Events,
    private studentService: StudentService
  ) {
    this.student= navParams.get("student");

    // TODO: Uncomment this so DB problem statements show in dropdown
    // if (this.student.problemStatements) {
    //   this.existingStatementOptions = this.student.problemStatements;
    // }
  }

  /*
    Called when this page is "entered".
    Get the list of new matches with the student model.
  */
  ionViewDidEnter() {
    if (this.matchList == undefined || this.matchList.length < 1) {
      this.pageLoading = true;

      if (this.student != undefined) {
        this.getNewMatches();
      }
      else {
        this.events.subscribe('tabs:student', (student) => {
          this.student = student;
          this.getNewMatches();
        });
      }
    }
  }

  /*
    Called when this page is "exited".
    Unsubscribe from any declared events to avoid double triggering.
  */
  ionViewDidLeave() {
   this.events.unsubscribe("tabs:student");
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
    Called when the value of the existing problem statement select box changes.
    Used to reset the field when "None" is selected. This is because Ionic
    for some reason doesn't allow deselecting of options in a select.
  */
  selectChanged() {
    if (this.existingStatementModel == -1) {
      this.existingStatementModel = undefined;
      this.problemStatementForm.reset();
    }
  }

  /*
    Called when creating a new custom problem statement.
    Show the new problem statement modal.
  */
  newStatement() {
    let modal = this.modalCtrl.create(ProblemStatementAddModal, {});
    modal.onDidDismiss(data => {
      if (data) {
        this.problemStatement = data;
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
    this.problemStatement = undefined;
  }

  /*
    Go back one stage for the current match card.
  */
  previousStage() {
    this.stage--;
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
      if ((this.existingStatementOptions && this.existingStatementOptions.length > 0 && this.problemStatementForm && this.problemStatementForm.valid)
          || this.problemStatement != undefined) {

        if (this.problemStatement) {
          this.match.studentProblemResponse = this.problemStatement.statement;
        }
        else {
          this.match.studentProblemResponse = this.existingStatementModel.statement;
        }

        // API call to submit match with problem statement
        this.studentService.submitMatchProblemStatement(this.match.id, this.match.studentProblemResponse).subscribe(
          res => { },
          error => {
            if (!error || error.status != 200) {
              console.log("Error submitting problem statement");
              console.log(error);
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
    Decline the current match, notify the DB and show the next match.
  */
  decline() {
    this.studentService.declineMatch(this.match.id).subscribe(
      data => { },
      error => {
        if (!error || error.status != 200) {
          console.log("Error declining match");
          console.log(error);
        }
      }
    );

    this.fadeLeft = true;

    setTimeout(() => {
      removeMatchFromArray(this.matchList, this.match);
      this.nextMatch();
      this.fadeLeft = false;
      this.fadeRightInstant = true;

      setTimeout(() => {
        this.fadeRightInstant = false;
      }, 100);
    }, fadeTime);
  }

  /*
    Show the next match in the list of matches at this phase.
  */
  nextMatch() {
    if (this.matchIndex + 1 < this.matchList.length) {
      this.matchIndex = this.matchIndex + 1;
    }
    else {
      this.matchIndex = 0;
    }

    this.stage = 0;
    this.prepMatch();
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
        }, fadeTime / 2);

        setTimeout(() => {
          removeMatchFromArray(this.matchList, this.match);
          this.nextMatch();
          this.fadeLeft = false;
          this.fadeRightInstant = true;

          setTimeout(() => {
            this.fadeRightInstant = false;
          }, 100);
        }, fadeTime);

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
  getNewMatches() {
    this.studentService.getNewMatches(this.student.id).subscribe(
      data => {
        this.matchList = data;

        if (this.matchList != undefined && this.matchList.length > 0) {
          this.matchList.sort((a, b) => {
            if (a.matchStrength < b.matchStrength) return 1;
            else if (a.matchStrength > b.matchStrength) return -1;
            else return 0;
          });
  
          this.matchIndex = 0;
          this.prepMatch();
        }
        else {
          this.pageLoading = false;
        }
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

  // TODO: Remove comment
  // I know this function is dusgusting, but I have it in for now for sake of
  // things working. It isn't really bad performance-wise because I'm capping
  // the loops at low numbers, but still. Maybe some of this makes more sense
  // server-side, but that will take a lot of effort to setup so I imagine
  // that will be more of a summer time patch. TODO: Remove this comment...
  /*
    Prepare the current match for the view. Gathers data and sets flags based on matched
    skills and preferences to show match indicators on the match card.
  */
  prepMatch() {
    // Set the current match to the current index
    this.match = new MatchModel(this.matchList[this.matchIndex]);
    this.matchPoints = {industry: false, locations: [false, false], skills: []};

    // No matches in this phase, nothing to prep
    if (this.match == undefined) {
      return;
    }

    // Check if any preferred industries match
    this.student.preferredIndustries.forEach(industry => {
      if (this.match.job.company.industries.some(ind => ind === industry)) {
        if (!this.matchPoints.industry) {
          this.match["matchedIndustry"] = industry;
          this.matchPoints.industry = true;
        }
      }
    });

    // Check if any preferred locations match
    let numLocationsToShow = 2;
    let locIndex = 0;
    for (locIndex; locIndex < numLocationsToShow; locIndex++) {
      if (this.match.job.locations[locIndex] != undefined &&
          this.student.preferredLocations.some(loc => loc === this.match.job.locations[locIndex])) {
        this.matchPoints.locations[locIndex] = true;
      }
    }

    // Build the list of matched skills. Searches through the job's skills and the
    // student's skills to show which ones were matched on.
    let reqSkills = this.match.job.requiredSkills.map(x => Object.assign({}, x));
    let reqSkillsMatched = [];
    let nthSkills = this.match.job.niceToHaveSkills.map(x => Object.assign({}, x));
    let nthSkillsMatched = [];
    this.student.skills.forEach(studentSkill => {
      if (reqSkills.some(skill => skill.id === studentSkill.id)) {
        reqSkillsMatched.push(studentSkill);
        removeSkillFromArray(reqSkills, studentSkill);
      }

      if (nthSkills.some(skill => skill.id === studentSkill.id)) {
        nthSkillsMatched.push(studentSkill);
        removeSkillFromArray(nthSkills, studentSkill);
      }
    });

    // Build the list of skills to show
    let prefNumReqSkillsToShow = 2;
    let prefNumNthSkillsToShow = 1;
    let prefTotalSkillsToShow = prefNumReqSkillsToShow + prefNumNthSkillsToShow;
    let skillsToShow = [];
    let reqSkillsToShow = [];
    let nthSkillsToShow = [];
    let toRemove = [];

    // Add up to the preferred number of matched required skills
    for (let i = 0; i < prefNumReqSkillsToShow; i++) {
      if (reqSkillsMatched[i] != undefined) {
        reqSkillsToShow.push(reqSkillsMatched[i]);
        toRemove.push(reqSkillsMatched[i]);
        this.matchPoints.skills.push(true);
      }
    }
    toRemove.forEach(el => {removeSkillFromArray(reqSkillsMatched, el);});
    toRemove = [];

    // If additional required skills should be shown
    if (reqSkillsToShow.length < prefNumReqSkillsToShow &&
        reqSkills.length >= (prefNumReqSkillsToShow - reqSkillsMatched.length)) {
      for (let i = 0; i < prefNumReqSkillsToShow - reqSkillsMatched.length; i++) {
        if (reqSkills[i] != undefined) {
          reqSkillsToShow.push(reqSkills[i]);
          toRemove.push(reqSkills[i]);
          this.matchPoints.skills.push(false);
        }
      }
    }
    toRemove.forEach(el => {removeSkillFromArray(reqSkills, el);});
    toRemove = [];

    // Add up to the preferred number of matched nice to have skills
    for (let i = 0; i < prefNumNthSkillsToShow; i++) {
      if (nthSkillsMatched[i] != undefined) {
        nthSkillsToShow.push(nthSkillsMatched[i]);
        toRemove.push(nthSkillsMatched[i]);
        this.matchPoints.skills.push(true);
      }
    }
    toRemove.forEach(el => {removeSkillFromArray(nthSkillsMatched, el);});
    toRemove = [];

    // If additional nice to have skills should eb shown
    if (nthSkillsToShow.length < prefNumNthSkillsToShow &&
        nthSkills.length >= (prefNumNthSkillsToShow - nthSkillsMatched.length)) {
      for (let i = 0; i < prefNumNthSkillsToShow - nthSkillsMatched.length; i++) {
        if (nthSkills[i] != undefined) {
          nthSkillsToShow.push(nthSkills[i]);
          toRemove.push(nthSkills[i]);
          this.matchPoints.skills.push(false);
        }
      }
    }
    toRemove.forEach(el => {removeSkillFromArray(nthSkills, el);});
    toRemove = [];

    let numInArrays = reqSkillsToShow.length + nthSkillsToShow.length;
    let keepRunning = true;
    while (keepRunning && numInArrays < prefTotalSkillsToShow) {
      if (reqSkillsMatched.length > 0) {
        for (let i = 0; i < prefTotalSkillsToShow - numInArrays; i++) {
          if (reqSkillsMatched[i] != undefined) {
            reqSkillsToShow.push(reqSkillsMatched[i]);
            this.matchPoints.skills.push(true);
          }
        }
      }
      else if (reqSkills.length > 0) {
        for (let i = 0; i < prefTotalSkillsToShow - numInArrays; i++) {
          if (reqSkills[i] != undefined) {
            reqSkillsToShow.push(reqSkills[i]);
            this.matchPoints.skills.push(false);
          }
        }
      }
      else if (nthSkillsMatched.length > 0) {
        for (let i = 0; i < prefTotalSkillsToShow - numInArrays; i++) {
          if (nthSkillsMatched[i] != undefined) {
            nthSkillsToShow.push(nthSkillsMatched[i]);
            this.matchPoints.skills.push(true);
          }
        }
      }
      else if (nthSkills.length > 0) {
        for (let i = 0; i < prefTotalSkillsToShow - numInArrays; i++) {
          if (nthSkills[i] != undefined) {
            nthSkillsToShow.push(reqSkills[i]);
            this.matchPoints.skills.push(false);
          }
        }
      }
      else {
        keepRunning = false;
      }

      numInArrays = reqSkillsToShow.length + nthSkillsToShow.length;
    }

    skillsToShow = reqSkillsToShow.concat(nthSkillsToShow);
    this.match["skillsToShow"] = skillsToShow;

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

/*
  Remove the given skill from the given array.
  This is needed because a simple index splice inline
  is causing ordering issues.
*/
function removeSkillFromArray(array, skill) {
  let index = 0;
  let indexToRemove = -1;
  array.forEach(skillInArr => {
    if (skillInArr.id == skill.id) {
      indexToRemove = index;
    }

    index++;
  });

  if (indexToRemove > -1) {
    array.splice(indexToRemove, 1);
  }
}

/*
  Remove the given match from the given array.
  This is needed because a simple index splice inline
  is causing ordering issues.
*/
function removeMatchFromArray(array, match) {
  let index = 0;
  let indexToRemove = -1;
  array.forEach(matchInArr => {
    if (matchInArr.id == match.id) {
      indexToRemove = index;
    }

    index++;
  });

  if (indexToRemove > -1) {
    array.splice(indexToRemove, 1);
  }
}
