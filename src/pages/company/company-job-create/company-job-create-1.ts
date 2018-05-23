import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { CompanyJobCreate2Page } from '@app/pages/company';

import {
  NewJobModel,
  RecruiterModel
} from '@app/models';

@Component({
  selector: 'page-company-job-create-1',
  templateUrl: 'company-job-create-1.html'
})
export class CompanyJobCreate1Page {

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  jobModel = NewJobModel.createNewJobModel();
  recruiter: RecruiterModel;

  locationOptions = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.recruiter = navParams.get("recruiter");
  }

  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate2Page, {recruiter: this.recruiter, job: this.jobModel});
    }
    else {
      this.presentToast("Please enter the job title and any job locations");
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
