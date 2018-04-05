import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StudentModel } from '../../models/student.model';

@Component({
  selector: 'page-student-phase-3',
  templateUrl: 'student-phase-3.html'
})
export class StudentPhase3Page {

  public student: StudentModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.student= navParams.get("student");
  }
}
