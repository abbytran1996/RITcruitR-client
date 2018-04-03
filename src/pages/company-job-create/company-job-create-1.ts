import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { CompanyJobCreate2Page } from './company-job-create-2';

import { JobModel } from '../../models/job.model';

const locations = [{text: 'Buffalo, New York', value: 0}, {text: 'Rochester, New York', value: 1}];

@Component({
  selector: 'page-company-job-create-1',
  templateUrl: 'company-job-create-1.html'
})
export class CompanyJobCreate1Page {

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  jobModel = new JobModel("", "", "", null, false, null, "", "", "");

  locationOptions = locations;

  companyId = undefined;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.companyId = navParams.get("companyId");
  }

  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate2Page, {companyId: this.companyId, job: this.jobModel});
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
