import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentSkillsPage } from '../student-skills/student-skills';

import { StudentJobPreferencesModel } from '../../models/student-job-preferences.model';
import { StudentModel } from '../../models/student.model';

import { StudentService } from '../../app/services/student.service';
import { DataService } from '../../app/services/data.service';

@Component({
  selector: 'page-student-job-preferences',
  templateUrl: 'student-job-preferences.html'
})
export class StudentJobPreferencesPage {

  public student: StudentModel;
  public isSetup = false;

  // ngForm object for validation control
  @ViewChild('jobPreferencesForm') jobPreferencesForm;

  // Form model
  model = new StudentJobPreferencesModel([], [], []);

  locationOptions = [];
  industryOptions = [];
  companySizeOptions = [];

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, private studentService: StudentService, private dataService: DataService) {
    this.student = navParams.get("student");

    // Get the data for the select fields
    this.locationOptions = this.dataService.getLocations();
    this.industryOptions = this.dataService.getIndustries();
    this.companySizeOptions = this.dataService.getCompanySizes();

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
    else {
      this.model.preferredLocations = this.student.preferredLocations;
      this.model.preferredIndustries = this.student.preferredIndustries;
      this.model.preferredCompanySizes = this.student.preferredCompanySizes;
    }
  }

  continueClicked() {
    if (this.jobPreferencesForm && this.jobPreferencesForm.valid) {
      this.student.updateMatchPreferences(this.model);
      this.studentService.updateStudent(this.student).subscribe(
        data => {},
        res => {
          if (res.status == 200) {
              this.navCtrl.push(StudentSkillsPage, {student: this.student, setup: true});
          }
          else {
            this.presentToast("There was an error updating your education details, please try again");
          }
        }
      );
    }
    else {
      this.presentToast("Please select at least one option for preferred company sizes");
    }
  }

  skipClicked() {
    this.navCtrl.push(StudentSkillsPage, {student: this.student, setup: true});
  }

  saveClicked() {
    if (this.jobPreferencesForm && this.jobPreferencesForm.valid) {
      this.student.updateMatchPreferences(this.model);
      this.studentService.updateStudent(this.student).subscribe(
        data => {},
        res => {
          if (res.status == 200) {
              this.navCtrl.setRoot(TabsPage, {message: "Match Preferences updated successfully"});
          }
          else {
            this.presentToast("There was an error updating your education details, please try again");
          }
        }
      );
    }
    else {
      this.presentToast("Please select at least one option for preferred company sizes");
    }
  }

  // Navigate back to the previous screen
  backBtn() {
    this.navCtrl.pop();
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
