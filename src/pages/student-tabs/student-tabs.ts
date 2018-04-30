import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, Events } from 'ionic-angular';

import { StudentPhase1Page } from '../student-home/student-phase-1';
import { StudentPhase2Page } from '../student-home/student-phase-2';
import { StudentPhase3Page } from '../student-home/student-phase-3';
import { StudentSkillsPage } from '../student-skills/student-skills';
import { StudentJobPreferencesPage } from '../student-job-preferences/student-job-preferences';
import { StudentProfileDetailsPage } from '../student-profile-details/student-profile-details';

import { LoginPage } from '../login/login';

import { StudentModel } from '../../models/student.model';

import { AuthService } from '../../app/services/auth.service';
import { StudentService } from '../../app/services/student.service';

@Component({
  selector: 'page-student-tabs',
  templateUrl: 'student-tabs.html'
})
export class StudentTabsPage {

  public skillsPageEvent;
  public prefsPageEvent;

  // Student tab pages
  public studentPhase1Tab = StudentPhase1Page;
  public studentPhase2Tab = StudentPhase2Page;
  public studentPhase3Tab = StudentPhase3Page;
  public studentTabParams: any;

  // User data
  public student: StudentModel;
  public loadingStudent = true;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private authService: AuthService,
    private studentService: StudentService,
    public events: Events
  ) {
    this.student = navParams.get("student");

    if (this.student != undefined) {
      this.studentTabParams = {student: this.student};
      this.loadingStudent = false;
    }
    else {
      let userEmail = window.localStorage.getItem("email");
      this.studentService.getStudentByEmail(userEmail).subscribe(
        data => {
          this.student = StudentModel.createStudentFromApiData(data);
          this.studentTabParams = {student: this.student};
          this.events.publish('tabs:student', this.student, Date.now());
          this.loadingStudent = false;
        },
        error => {
          this.presentToast("An error occurred loading your account, please try again later");
        }
      );
    }

    // If a message was sent with nav params, show it.
    let message = navParams.get("message");
    if (message) {
      this.presentToast(message);
    }
  }

  ionViewDidEnter() {
    // Setup events to show edit pages from child tabs
    this.events.subscribe('tab:editSkills', (student) => {
      this.editSkills();
    });

    this.events.subscribe('tab:editPrefs', (student) => {
      this.editStudentJobPreferences();
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe("tab:editSkills");
    this.events.unsubscribe("tab:editPrefs");
  }

  /*
    Student Nav Options
    ===========================================================================
  */

  // Edit the student skills
  editSkills() {
    this.navCtrl.push(StudentSkillsPage, {student: this.student});
  }

  // Edit the student match preferences
  editStudentJobPreferences() {
    this.navCtrl.push(StudentJobPreferencesPage, {student: this.student});
  }

  // Edit the student details (education, contact, work experience)
  editStudentDetails() {
    this.navCtrl.push(StudentProfileDetailsPage, {student: this.student});
  }

  // Logout the current user and return to the login screen.
  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, animation: "md-transition"});
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
