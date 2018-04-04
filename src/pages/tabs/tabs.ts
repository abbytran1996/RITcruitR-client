import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

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

import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  showStudentTabs = true;

  // Student tab pages
  studentPhase1Tab = StudentPhase1Page;
  studentPhase2Tab = StudentPhase2Page;
  studentPhase3Tab = StudentPhase3Page;

  // Company tab pages
  companyPhase1Tab = CompanyPhase1Page;
  companyPhase2Tab = CompanyPhase2Page;
  companyPhase3Tab = CompanyPhase3Page;

  public user: any;
  public tabParams: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, private authService: AuthService) {
    this.user = navParams.get("user");

    if (navParams.get("isStudent") != undefined) {
      this.showStudentTabs = navParams.get("isStudent");
    }

    // If a user was sent, get its role type to properly build the tabs and menu.
    if (this.user != undefined) {
      this.user.roles.forEach(role => {
        if (role.name == "student") {
          this.showStudentTabs = true;
        }
        else {
          this.showStudentTabs = false;
        }
      });
    }

    // Set the user in the tab params so each tab has access.
    this.tabParams = {user: this.user};

    // If a message was sent with nav params, show it.
    let message = navParams.get("message");
    if (message) {
      this.presentToast(message);
    }
  }

  editSkills() {
    this.navCtrl.push(StudentSkillsPage, {user: this.user});
  }


  editStudentJobPreferences() {
    this.navCtrl.push(StudentJobPreferencesPage, {user: this.user});
  }

  editStudentDetails() {
    this.navCtrl.push(StudentProfileDetailsPage, {user: this.user});
  }

  createCompanyJob() {
    // TODO: Update the companyId below to be the actual company ID.
    this.navCtrl.push(CompanyJobCreate1Page, {companyId: 0});
  }

  editCompanyDetails() {
    this.navCtrl.push(CompanyDetailsPage, {companyId: 0});
  }

  addRecruiter() {
    this.navCtrl.push(RecruiterRegisterPage, {companyId: 0});
  }

  editRecruiters() {

  }

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
