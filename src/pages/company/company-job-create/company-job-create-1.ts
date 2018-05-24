import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { CompanyJobCreate2Page } from '@app/pages/company';

import {
  NewJobModel,
  RecruiterModel
} from '@app/models';

//=========================================================================
// * CompanyJobCreate1Page                                                   
//=========================================================================
// - Page for the job creation process. This is part 1 of 8.
// - In part 1, the job title and locations are entered.
//_________________________________________________________________________
@Component({
  selector: 'page-company-job-create-1',
  templateUrl: 'company-job-create-1.html'
})
export class CompanyJobCreate1Page {

  public jobModel = new NewJobModel();
  public recruiter: RecruiterModel;

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  locationOptions = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.recruiter = navParams.get("recruiter");
  }

  /*
    Continue to the next part of job creation.
  */
  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate2Page, {recruiter: this.recruiter, job: this.jobModel});
    }
    else {
      this.presentToast("Please enter the job title and any job locations");
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
}
