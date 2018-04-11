import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { CompanyJobCreate7Page } from './company-job-create-7';

import { NewJobModel } from '../../models/new-job.model';
import { RecruiterModel } from '../../models/recruiter.model';

@Component({
  selector: 'page-company-job-create-6',
  templateUrl: 'company-job-create-6.html'
})
export class CompanyJobCreate6Page {

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  jobModel: NewJobModel;
  recruiter: RecruiterModel;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.recruiter = navParams.get("recruiter");
    this.jobModel = navParams.get("job");
  }

  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate7Page, {recruiter: this.recruiter, job: this.jobModel});
    }
    else {
      this.presentToast("Please enter a valid job duration");
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
