import { Component } from '@angular/core';
import { NavController, NavParams, Events, ToastController } from 'ionic-angular';

import { StudentJobPreferencesPage } from '../student-job-preferences/student-job-preferences';
import { StudentSkillsPage } from '../student-skills/student-skills';

import { StudentModel } from '../../models/student.model';
import { MatchModel } from '../../models/match.model';

import { StudentService } from '../../app/services/student.service';

const fadeTime = 400;

@Component({
  selector: 'page-student-phase-1',
  templateUrl: 'student-phase-1.html'
})
export class StudentPhase1Page {

  public student: StudentModel;
  public matchList: any;
  public match: MatchModel;
  public matchIndex = 0;
  public matchPoints = {industry: false, locations: [false, false], skills: []};
  public stage = 0;
  public maxStage = 2;
  public fadeLeft = false;
  public fadeLeftInstant = false;
  public fadeRight = false;
  public fadeRightInstant = false;
  public matchSuccess = false;
  public matchSuccessFade = false;
  public matchSuccessTransform = false;
  public matchSuccessContentFade = false;
  public hideCard = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public events: Events,
    private studentService: StudentService
  ) {
    this.student= navParams.get("student");

    this.getNewMatches();
    this.matchIndex = 0;
    this.prepMatch();
  }

  ionViewDidEnter() {
    this.events.subscribe('student:obtained', (student) => {
      this.student = student;
      this.getNewMatches();
      this.matchIndex = 0;
      this.prepMatch();
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe("student:obtained");
  }

  backBtn() {
    this.stage--;
  }

  interested() {
    if (this.stage + 1 <= this.maxStage) {
      this.stage++;
    }
    else {
      // TODO: Make service call to update match with work statement and update stage
      this.animateSuccess();
    }
  }

  decline() {
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

  getNewMatches() {
    this.matchList = this.studentService.getNewMatches(this.student.id);
  }

  editSkills() {
    this.events.publish('tab:editSkills', this.student);
  }

  editPrefs() {
    this.events.publish('tab:editPrefs', this.student);
  }

  // I know this function is dusgusting, but I have it in for now for sake of
  // things working. It isn't really bad performance-wise because I'm capping
  // the loops at low numbers, but still. Maybe some of this makes more sense
  // server-side, but that will take a lot of effort to setup so I imagine
  // that will be more of a summer time patch. TODO: Remove this comment...
  prepMatch() {
    this.match = this.matchList[this.matchIndex];
    this.matchPoints = {industry: false, locations: [false, false], skills: []};

    // No matches in this phase
    if (this.match == undefined) {
      return;
    }

    // Check industry matches
    this.student.preferredIndustries.forEach(industry => {
      if (this.match.job.company.industries.some(ind => ind === industry)) {
        if (!this.matchPoints.industry) {
          this.match["matchedIndustry"] = industry;
          this.matchPoints.industry = true;
        }
      }
    });

    // Check location matches
    let numLocationsToShow = 2;
    let locIndex = 0;
    for (locIndex; locIndex < numLocationsToShow; locIndex++) {
      if (this.match.job.locations[locIndex] != undefined &&
          this.student.preferredLocations.some(loc => loc === this.match.job.locations[locIndex])) {
        this.matchPoints.locations[locIndex] = true;
      }
    }

    // Build the list of matched skills
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
  }

  // Present a toast message to the user
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
