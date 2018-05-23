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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private studentService: StudentService
  ) {
    this.student= navParams.get("student");

    this.getFinalMatches();
  }

  /*
    Get the list of "final" phase 3 matches for the current student.
  */
  getFinalMatches() {
    this.matchList = this.studentService.getFinalMatches(this.student.id);
  }
}
