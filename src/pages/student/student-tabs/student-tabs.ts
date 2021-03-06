import { Component } from '@angular/core';
import {
  NavController,
  ToastController,
  MenuController,
  NavParams,
  Events
} from 'ionic-angular';

import {
  StudentPhase1Page,
  StudentPhase2Page,
  StudentPhase3Page,
  StudentDetailFormsPage,
  StudentPresentationLinksPage,
  StudentProblemStatementsPage,
  StudentProfileDetailsPage
} from '@app/pages/student';

import { LoginPage } from '@app/pages/general';

import { StudentModel } from '@app/models';

import {
  AuthService,
  StudentService 
} from '@app/services';

//=========================================================================
// * StudentTabsPage                                                   
//=========================================================================
// - Main "dashboard" page for students. Shows the StudentPhase1Page as
//   the first tab. Has other tabs to see other phases. Also shows 
//   a side nav drawer with many other pages.
//_________________________________________________________________________
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

  public numPhase1Matches;
  public numPhase2Matches;
  public numFinalMatches;

  // User data
  public student: StudentModel;
  public loadingStudent = true;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    private authService: AuthService,
    private studentService: StudentService,
    public events: Events
  ) {
    this.student = navParams.get("student");

    if (this.student == undefined) {
      let userEmail = window.localStorage.getItem("email");
      this.studentService.getStudentByEmail(userEmail).subscribe(
        data => {
          this.student = new StudentModel(data);

          if (navParams.get("firstLoad") == true) {
            this.events.publish('firstload:student', this.student);
            this.studentTabParams = { student: this.student };
          }
          else {
            this.events.publish('tabs:student', this.student);
            this.studentTabParams = { student: this.student };
          }

          this.loadingStudent = false;
        },
        error => {
          this.presentToast("An error occurred loading your account, please try again later");
        }
      );
    }
    else {
      this.studentTabParams = { student: this.student };
      this.loadingStudent = false;
    }

    // If a message was sent with nav params, show it.
    let message = navParams.get("message");
    if (message) {
      this.presentToast(message);
    }
  }

  /*
    Called when this page is "entered".
    Subscribe to some events used to call nav options from tab pages.
  */
  ionViewDidEnter() {
    // Setup events to show edit pages from child tabs
    this.events.subscribe('tab:editSkills', (student) => {
      this.editSkills();
    });

    this.events.subscribe('tab:editPrefs', (student) => {
      this.editStudentJobPreferences();
    });

    this.events.subscribe('tab:numMatches', (student) => {
      this.getNumMatches();
    });
  }

  /*
    Called when this page is "exited".
    Unsubscribe from events.
  */
  ionViewDidLeave() {
    this.events.unsubscribe("tab:editSkills");
    this.events.unsubscribe("tab:editPrefs");
    this.events.unsubscribe("tab:numMatches");
  }

  /*
    Get the number of macthes in each phase.
  */
  getNumMatches() {
    // Get phase 1 num
    this.studentService.getNumPhase1Matches(this.student.id).subscribe(
      data1 => {
        this.numPhase1Matches = data1;

        // Get phase 2 num
        this.studentService.getNumPhase2Matches(this.student.id).subscribe(
          data2 => {
            this.numPhase2Matches = data2;

            // Get final phase num
            this.studentService.getNumFinalMatches(this.student.id).subscribe(
              data3 => {
                this.numFinalMatches = data3;
              }, res => { }
            );
          }, res => { }
        );
      }, res => { }
    );
  }

  /*
    Show the student skills page.
  */
  editSkills() {
    this.navCtrl.push(StudentDetailFormsPage, {student: this.student, startStep: 3});
  }

  /*
    Show the student job preferences page.
  */
  editStudentJobPreferences() {
    this.navCtrl.push(StudentDetailFormsPage, {student: this.student, startStep: 2});
  }

  /*
    Show the student presentation links page.
  */
  editStudentPresentationLinks() {
    this.navCtrl.push(StudentPresentationLinksPage, { student: this.student });
  }

  /*
    Show the student problem statements page.
  */
  editStudentProblemStatements() {
    this.navCtrl.push(StudentProblemStatementsPage, { student: this.student });
  }

  /*
    Show the student details page. Has nav options for education, contact, and work experience.
  */
  editStudentDetails() {
    this.navCtrl.push(StudentProfileDetailsPage, {student: this.student});
  }

  /*
    Logout the current user and return to the login screen.
  */
  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, animation: "md-transition"});
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
}
