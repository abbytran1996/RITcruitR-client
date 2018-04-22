import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StudentModel } from '../../models/student.model';
import { MatchModel } from '../../models/match.model';

import { StudentService } from '../../app/services/student.service';

const fadeTime = 400;

@Component({
  selector: 'page-student-phase-2',
  templateUrl: 'student-phase-2.html'
})
export class StudentPhase2Page {

  public student: StudentModel;
  public matchList: any;
  public match: MatchModel;
  public matchIndex = 0;
  public stage = 0;
  public maxStage = 1;
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
    private studentService: StudentService
  ) {
    this.student= navParams.get("student");

    this.getPhase2Matches();
    this.matchIndex = 0;
    this.prepMatch();
  }

  backBtn() {
    this.stage--;
  }

  interested() {
    if (this.stage + 1 <= this.maxStage) {
      this.stage++;
    }
    else {
      // Submit to recruiter
      this.animateSuccess();
    }
  }

  decline() {
    this.fadeLeft = true;

    setTimeout(() => {
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
          this.nextMatch();
          this.fadeLeft = false;
          this.fadeRightInstant = true;

          setTimeout(() => {
            this.fadeRightInstant = false;
          }, 100);
        }, fadeTime);

        setTimeout(() => {
          this.matchSuccessFade = false;

          setTimeout(() => {
            this.matchSuccessContentFade = false;

            this.matchSuccessTransform = false;
            this.matchSuccess = false;
          }, 200);
        }, 300);
      }, 100);
    }, 100);
  }

  getPhase2Matches() {
    this.matchList = this.studentService.getPhase2Matches(this.student.id);
  }

  prepMatch() {
    this.match = this.matchList[this.matchIndex];

    // No matches in this phase
    if (this.match == undefined) {
      return;
    }

    let matchPoints = { industry: false };

    // Check industry matches
    this.student.preferredIndustries.forEach(industry => {
      if (this.match.job.company.industries.some(ind => ind === industry)) {
        if (!matchPoints.industry) {
          this.match["matchedIndustry"] = industry;
          matchPoints.industry = true;
        }
      }
    });
  }

  openLink(link) {
    window.open(link, '_system', 'location=yes');
  }
}
