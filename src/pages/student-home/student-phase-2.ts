import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StudentModel } from '../../models/student.model';

@Component({
  selector: 'page-student-phase-2',
  templateUrl: 'student-phase-2.html'
})
export class StudentPhase2Page {

  public student: StudentModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student= navParams.get("student");
  }
}
