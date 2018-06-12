import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {
  StudentModel,
  MatchModel
} from '@app/models';

import { StudentService } from '@app/services';

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
  public detailMode = false;
  public currentMatch: MatchModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private studentService: StudentService
  ) {
    this.student= navParams.get("student");
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
  }

  /*
    Show the match detail screen for the match that was clicked.
  */
  matchDetails(match) {
    this.currentMatch = new MatchModel(match);
    this.detailMode = true;
  }

  /*
    Show the final match list.
  */
  backToList() {
    this.currentMatch = undefined;
    this.detailMode = false;
  }

  /*
    Show the review screens for the current match.
  */
  reviewMatch() {

  }

  /*
    Archive the current match.
  */
  archiveMatch() {

  }

  /*
    Get the list of "final" phase 3 matches for the current student.
  */
  getFinalMatches() {
    this.matchList = this.studentService.getFinalMatches(this.student.id).subscribe(
      res => {
        this.matchList = res;

        if (this.matchList != undefined && this.matchList.length > 0) {
          this.matchList.sort((a, b) => {
            if (a.matchStrength < b.matchStrength) return 1;
            else if (a.matchStrength > b.matchStrength) return -1;
            else return 0;
          });

          this.pageLoading = false;
        }
        else {
          this.pageLoading = false;
        }
      },
      error => {
        console.log("Error getting final matches");
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
}
