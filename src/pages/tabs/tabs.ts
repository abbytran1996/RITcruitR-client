import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, Events } from 'ionic-angular';

import { StudentPhase1Page } from '../student-home/student-phase-1';
import { StudentPhase2Page } from '../student-home/student-phase-2';
import { StudentPhase3Page } from '../student-home/student-phase-3';
import { StudentSkillsPage } from '../student-skills/student-skills';
import { StudentJobPreferencesPage } from '../student-job-preferences/student-job-preferences';
import { StudentProfileDetailsPage } from '../student-profile-details/student-profile-details';

import { CompanyPhase1Page } from '../company-home/company-phase-1';
import { CompanyPhase2Page } from '../company-home/company-phase-2';
import { CompanyPhase3Page } from '../company-home/company-phase-3';
import { CompanyDetailsPage } from '../company-details/company-details';
import { CompanyJobCreate1Page } from '../company-job-create/company-job-create-1';
import { RecruiterContactPage } from '../recruiter-contact/recruiter-contact';
import { RecruiterRegisterPage } from '../recruiter-register/recruiter-register';

import { LoginPage } from '../login/login';

import { StudentModel } from '../../models/student.model';
import { RecruiterModel } from '../../models/recruiter.model';

import { AuthService } from '../../app/services/auth.service';
import { StudentService } from '../../app/services/student.service';
import { RecruiterService } from '../../app/services/recruiter.service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public showStudentTabs = false;

  // Student tab pages
  public studentPhase1Tab = StudentPhase1Page;
  public studentPhase2Tab = StudentPhase2Page;
  public studentPhase3Tab = StudentPhase3Page;
  public studentTabParams: any;

  // Company tab pages
  public companyPhase1Tab = CompanyPhase1Page;
  public companyPhase2Tab = CompanyPhase2Page;
  public companyPhase3Tab = CompanyPhase3Page;
  public recruiterTabParams: any;

  // User stored data
  private userId: any;
  private userEmail: any;
  private userRole: any;
  public student: StudentModel;
  public recruiter: RecruiterModel;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private authService: AuthService,
    private studentService: StudentService,
    private recruiterService: RecruiterService,
    public events: Events
  ) {
    this.userId = window.localStorage.getItem('id');
    this.userEmail = window.localStorage.getItem('email');
    this.userRole = window.localStorage.getItem('role');

    // Load the correct data depending on user role
    // TODO: Update this to be more secure once we do our security updates
    if (this.userRole == "0") {
      this.studentService.getStudentByEmail(this.userEmail).subscribe(
        data => {
          this.student = StudentModel.createStudentFromApiData(data);
          this.showStudentTabs = true;

          // Set the user in the tab params so each tab has access.
          this.studentTabParams = {student: this.student};

          this.events.publish('student:obtained', this.student);
        },
        error => {
          this.presentToast("An error occurred loading your account, please try again later");
        }
      );
    }
    else if (this.userRole == "1") {
      this.recruiterService.getRecruiterByEmail(this.userEmail).subscribe(
        data => {
          this.recruiter = RecruiterModel.createRecruiterFromApiData(data);
          this.showStudentTabs = false;

          // Set the user in the tab params so each tab has access.
          this.recruiterTabParams = {recruiter: this.recruiter};

          this.events.publish('recruiter:obtained', this.recruiter);
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

  /*
    Recruiter Nav Options
    ===========================================================================
  */

  // Create a job as a recruiter
  createCompanyJob() {
    // TODO: Update the companyId below to be the actual company ID.
    this.navCtrl.push(CompanyJobCreate1Page, {companyId: 0});
  }

  // Edit the details for a company
  editCompanyDetails() {
    this.navCtrl.push(CompanyDetailsPage, {companyId: 0});
  }

  // Add a new recruiter to the company
  addRecruiter() {
    this.navCtrl.push(RecruiterRegisterPage, {companyId: 0});
  }

  // Edit the recruiters in a company
  editRecruiters() {

  }

  // Edit the recruiters contact info
  editContact() {
    this.navCtrl.push(RecruiterContactPage, {edit: true}); // TODO: Send the recruiter
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
