import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StudentModel } from '../../models/student.model';
import { MatchModel } from '../../models/match.model';

import { StudentService } from '../../app/services/student.service';

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

  getFinalMatches() {
    this.matchList = this.studentService.getFinalMatches(this.student.id);
  }
}
