import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';

import { CompanyJobCreate8Page } from './company-job-create-8';

import { NewJobModel } from '../../models/new-job.model';
import { RecruiterModel } from '../../models/recruiter.model';

@Component({
  selector: 'page-company-job-create-7',
  templateUrl: 'company-job-create-7.html'
})
export class CompanyJobCreate7Page {

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

  problemStatementInfo() {
    this.showAlert(
      "Problem Statement",
      "Provide a short statement specifying a problem that may often be encountered in the job position and describe some of the technologies and techniques typically used. This isn't intended to be a question for the student, but a short statement giving a good idea of what work to expect on the job."
    );
  }

  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate8Page, {recruiter: this.recruiter, job: this.jobModel});
    }
    else {
      this.presentToast("Please enter a job problem statement");
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
