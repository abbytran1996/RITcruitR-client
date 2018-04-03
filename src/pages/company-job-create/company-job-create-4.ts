import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { CompanyJobCreate5Page } from './company-job-create-5';

import { JobModel } from '../../models/job.model';

@Component({
  selector: 'page-company-job-create-4',
  templateUrl: 'company-job-create-4.html'
})
export class CompanyJobCreate4Page {

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  jobModel = new JobModel("", "", "", null, false, null, "", "", "");

  companyId = undefined;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.companyId = navParams.get("companyId");
    this.jobModel = navParams.get("job");
  }

  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate5Page, {companyId: this.companyId, job: this.jobModel});
    }
    else {
      this.presentToast("");
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
