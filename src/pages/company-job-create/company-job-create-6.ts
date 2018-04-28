import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';

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
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.recruiter = navParams.get("recruiter");
    this.jobModel = navParams.get("job");
  }

  durationInfo() {
    this.showAlert(
      "Job Duration",
      "A job position may no longer be applied to after the time specified in this field. Any students in the process of applying will lose the ability to finish, but any completed applications may still be viewed on both ends."
    );
  }

  thresholdInfo() {
    this.showAlert(
      "Match Threshold",
      "The match threshold determines how close an applicant must match in order to see the position and apply. A higher value will result in less matches, but those matches will fit the job's requirements more closely."
    );
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

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
