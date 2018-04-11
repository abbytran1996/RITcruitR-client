import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { StudentModel } from '../../models/student.model';

@Component({
  selector: 'page-student-phase-1',
  templateUrl: 'student-phase-1.html'
})
export class StudentPhase1Page {

  public student: StudentModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    this.student= navParams.get("student");

    events.subscribe('student:obtained', (student) => {
      this.student = student;
    });
  }
}
