import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { CompanyJobCreate4Page } from './company-job-create-4';

import { NewJobModel } from '../../models/new-job.model';
import { RecruiterModel } from '../../models/recruiter.model';

import { DataService } from '../../app/services/data.service';

@Component({
  selector: 'page-company-job-create-3',
  templateUrl: 'company-job-create-3.html'
})
export class CompanyJobCreate3Page {

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  jobModel: NewJobModel;
  recruiter: RecruiterModel;

  skillOptions = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public dataService: DataService
  ) {
    this.recruiter = navParams.get("recruiter");
    this.jobModel = navParams.get("job");

    // Get the skills to populate the typeahead
    this.dataService.getSkills().subscribe(
      data => {
        this.skillOptions = data;
      },
      error => {
        this.presentToast("There was an error retrieving the list of skills, please try again");
      }
    );
  }

  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate4Page, {recruiter: this.recruiter, job: this.jobModel});
    }
    else {
      this.presentToast("There is a problem with the skills you have selected, please review them and try again");
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
