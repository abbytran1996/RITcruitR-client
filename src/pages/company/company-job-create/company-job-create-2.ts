import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';

import { CompanyJobCreate3Page } from '@app/pages/company';

import {
  NewJobModel,
  RecruiterModel
} from '@app/models';

@Component({
  selector: 'page-company-job-create-2',
  templateUrl: 'company-job-create-2.html'
})
export class CompanyJobCreate2Page {

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  jobModel: NewJobModel;
  recruiter: RecruiterModel;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.recruiter = navParams.get("recruiter");
    this.jobModel = navParams.get("job");
  }

  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate3Page, {recruiter: this.recruiter, job: this.jobModel});
    }
    else {
      this.presentToast("Please enter a job description");
    }
  }

  descriptionInfo() {
    this.showAlert(
      "Job Description",
      "Write a description of the job, the responsibilities involved, and other details you may want a student to know about the position. Avoid writing out job skills in the description, for those will be added later. The first 200 characters of the description will be shown to students when they first match."
    );
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
