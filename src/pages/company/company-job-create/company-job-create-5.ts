import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';

import { CompanyJobCreate6Page } from '@app/pages/company';

import {
  NewJobModel,
  RecruiterModel
} from '@app/models';

//=========================================================================
// * CompanyJobCreate5Page                                                   
//=========================================================================
// - Page for the job creation process. This is part 5 of 8.
// - In part 5, the job filters (min gpa, has work experience) are entered.
//_________________________________________________________________________
@Component({
  selector: 'page-company-job-create-5',
  templateUrl: 'company-job-create-5.html'
})
export class CompanyJobCreate5Page {

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
    Show an alert dialog explaining the minimum GPA.
  */
  minGpaInfo() {
    this.showAlert(
      "Minimum GPA",
      "Students with a GPA below this number will not be matched."
    );
  }

  /*
    Show an alert dialog explaining has work experience.
  */
  workExperienceInfo() {
    this.showAlert(
      "Has Work Experience",
      "If toggled on, students with no work experience on their profile will not be matched."
    );
  }

  /*
    Continue to the next part of job creation.
  */
  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.navCtrl.push(CompanyJobCreate6Page, {recruiter: this.recruiter, job: this.jobModel});
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
