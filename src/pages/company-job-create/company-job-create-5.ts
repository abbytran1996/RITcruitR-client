import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';

import { CompanyJobCreate6Page } from './company-job-create-6';

import { NewJobModel } from '../../models/new-job.model';
import { RecruiterModel } from '../../models/recruiter.model';

@Component({
  selector: 'page-company-job-create-5',
  templateUrl: 'company-job-create-5.html'
})
export class CompanyJobCreate5Page {

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

  minGpaInfo() {
    this.showAlert(
      "Minimum GPA",
      "Students with a GPA below this number will not be matched."
    );
  }

  workExperienceInfo() {
    this.showAlert(
      "Has Work Experience",
      "If toggled on, students with no work experience on their profile will not be matched."
    );
  }

  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate6Page, {recruiter: this.recruiter, job: this.jobModel});
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
