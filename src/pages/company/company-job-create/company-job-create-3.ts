import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';

import { CompanyJobCreate4Page } from '@app/pages/company';

import {
  NewJobModel,
  RecruiterModel
} from '@app/models';

import { DataService } from '@app/services';

@Component({
  selector: 'page-company-job-create-3',
  templateUrl: 'company-job-create-3.html'
})
export class CompanyJobCreate3Page {

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  jobModel: NewJobModel;
  recruiter: RecruiterModel;

  skillOptions = [];
  skills = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public dataService: DataService
  ) {
    this.recruiter = navParams.get("recruiter");
    this.jobModel = navParams.get("job");

    // Get the skills to populate the typeahead
    this.dataService.getSkills().subscribe(
      data => {
        this.skillOptions = data;
      },
      error => {
        this.presentToast("There was an error retrieving the list of skills, please try again");
      }
    );
  }

  reqSkillsInfo() {
    this.showAlert(
      "Required Skills",
      "Required skills are skills that a student must have in order to be matched with a job position. Adding more will refine your matches to ensure applicants are closer to what you're looking for, but too many can result in fewer matches."
    );
  }

  removeSkill(index) {
    this.skills.splice(index, 1);
  }

  continueClicked() {
    if (this.jobForm && this.jobForm.valid && this.skills.length > 0) {
      this.jobModel.requiredSkills = this.skills;
      this.navCtrl.push(CompanyJobCreate4Page, {recruiter: this.recruiter, job: this.jobModel});
    }
    else {
      this.presentToast("Please select at least one required skill. Having no required skills will result in no matches.");
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

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
