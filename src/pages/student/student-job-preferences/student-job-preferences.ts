import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  StudentTabsPage,
  StudentSkillsPage
} from '@app/pages/student';

import {
  StudentJobPreferencesModel,
  StudentModel
} from '@app/models';

import {
  StudentService,
  DataService
} from '@app/services';

//=========================================================================
// * StudentJobPreferences                                                   
//=========================================================================
// - Page to update student job preferences for matching such as preferred
//   locations, industries, and company sizes.
//_________________________________________________________________________
@Component({
  selector: 'page-student-job-preferences',
  templateUrl: 'student-job-preferences.html'
})
export class StudentJobPreferencesPage {

  public student: StudentModel;
  public model = new StudentJobPreferencesModel();
  public isSetup = false;

  // ngForm object for validation control
  @ViewChild('jobPreferencesForm') jobPreferencesForm;

  // Options for select inputs
  locationOptions = [];
  industryOptions = [];
  companySizeOptions = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private studentService: StudentService,
    private dataService: DataService
  ) {
    this.student = navParams.get("student");

    // Get the data for the select fields
    this.locationOptions = this.dataService.getLocations();
    this.industryOptions = this.dataService.getIndustries();
    this.companySizeOptions = this.dataService.getCompanySizesForStudent();

    // Determine if in setup or not
    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
    else {
      this.model.preferredLocations = this.student.preferredLocations;
      this.model.preferredIndustries = this.student.preferredIndustries;
      this.model.preferredCompanySizes = this.student.preferredCompanySizes;
    }
  }

  /*
    Save the student job preferences to the model and in the DB.
    If setup, proceed to next step, otherwise return to student tabs page.
  */
  saveChanges() {
    if (this.jobPreferencesForm && this.jobPreferencesForm.valid) {
      this.student.updateMatchPreferences(this.model);
      this.studentService.updateStudent(this.student).subscribe(
        data => {},
        res => {
          if (res.status == 200) {
            if (this.isSetup) {
              this.navCtrl.push(StudentSkillsPage, {student: this.student, setup: true});
            }
            else {
              this.navCtrl.setRoot(StudentTabsPage, { message: "Match Preferences updated successfully" });
            }
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

  /*
    Only available during setup. Skip this step and continue.
  */
  skipClicked() {
    this.navCtrl.push(StudentSkillsPage, {student: this.student, setup: true});
  }

  /*
    Navigate back to the previous screen.
  */
  backBtn() {
    this.navCtrl.pop();
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
