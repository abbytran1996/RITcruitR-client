import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentSkillsPage } from '../student-skills/student-skills';

import { StudentJobPreferencesModel } from '../../models/student-job-preferences.model';
import { StudentModel } from '../../models/student.model';

// TEMP lists, replace with API calls
const industries = [{text: 'Medical', id: 0}, {text: 'Food Service', id: 1}, {text: 'Transportation', id: 2}, {text: 'Hardware', id: 3}, {text: 'Software', id: 4}];
const locations = [{text: 'Buffalo, New York', id: 0}, {text: 'Rochester, New York', id: 1}, {text: 'New York City, New York', id: 2}, {text: 'San Jose, California', id: 3}, {text: 'Seattle, Washington', id: 4}];
const companySizes = [{text: "Startup", id: 0}, {text: "Small", id: 1}, {text: "Medium", id: 2}, {text: "Large", id: 3}, {text: "Huge", id: 4}];

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
  model = new StudentJobPreferencesModel([], [], null);

  industryOptions = industries;
  locationOptions = locations;
  companySizeOptions = companySizes;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.student = navParams.get("student");

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
    else {
      // TODO: Add call or use incoming data to set the model to the existing data.
      this.model.industries = [{text: 'Software', id: 4}];
      this.model.locations = [{text: 'Buffalo, New York', id: 0}];
      this.model.companySize = 0;
    }
  }

  continueClicked() {
    if (this.jobPreferencesForm && this.jobPreferencesForm.valid) {
      // TODO: Call API to create preferences
      this.navCtrl.push(StudentSkillsPage, {student: this.student, setup: true});
    }
    else {
      this.presentToast("Please select valid options for your job preferences");
    }
  }

  skipClicked() {
    this.navCtrl.push(StudentSkillsPage, {student: this.student, setup: true});
  }

  saveClicked() {
    if (this.jobPreferencesForm && this.jobPreferencesForm.valid) {
      // TODO: Call API to update preferences
      this.navCtrl.setRoot(TabsPage, {message: "Job Preferences updated successfully"});
    }
    else {
      this.presentToast("Please select valid options for your job preferences");
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
