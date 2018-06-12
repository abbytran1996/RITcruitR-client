import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';

import { CompanyJobCreate7Page } from '@app/pages/company';

import {
  NewJobModel,
  RecruiterModel
} from '@app/models';

//=========================================================================
// * CompanyJobCreate6Page                                                   
//=========================================================================
// - Page for the job creation process. This is part 6 of 8.
// - In part 6, the job match threshold and duration are entered.
//_________________________________________________________________________
@Component({
  selector: 'page-company-job-create-6',
  templateUrl: 'company-job-create-6.html'
})
export class CompanyJobCreate6Page {

  public jobModel: NewJobModel;
  public recruiter: RecruiterModel;

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.recruiter = navParams.get("recruiter");
    this.jobModel = navParams.get("job");
  }

  /*
    Show an alert dialog explaining the job duration.
  */
  durationInfo() {
    this.showAlert(
      "Job Duration",
      "A job position may no longer be applied to after the time specified in this field has passed. Any students in the process of applying will lose the ability to finish, but any completed applications may still be viewed on both ends."
    );
  }

  /*
    Show an alert dialog explaining the match threshold.
  */
  thresholdInfo() {
    this.showAlert(
      "Match Threshold",
      "The match threshold determines how close an applicant must match in order to see the position and apply. A higher value will result in less matches, but those matches will fit the job's requirements more closely."
    );
  }

  /*
    Continue to the next part of job creation.
  */
  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate7Page, {recruiter: this.recruiter, job: this.jobModel});
    }
    else {
      this.presentToast("Please enter a valid job duration");
    }
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

  /*
    Show an alert dialog with the given title and message.
  */
  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
