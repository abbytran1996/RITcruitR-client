import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { JobModel } from '../../models/job.model';

// TEMP lists, replace with API calls
const videos = [{text: "Company Advertisement Video", id: 0}, {text: "UI Developer Video", id: 1}];

@Component({
  selector: 'page-company-job-create-8',
  templateUrl: 'company-job-create-8.html'
})
export class CompanyJobCreate8Page {

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  jobModel = new JobModel("", "", "", null, false, null, "", "", "");
  companyId = undefined;

  videoOptions = videos;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.companyId = navParams.get("companyId");
    this.jobModel = navParams.get("job");
  }

  finishClicked() {
    if (this.jobForm && (this.jobForm.controls.video.valid || this.jobForm.controls.videoNew.valid)) {
      this.navCtrl.setRoot(TabsPage, {message: "New job successfully created"});
    }
    else {
      this.presentToast("Please select an existing video or add a new video URL");
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
