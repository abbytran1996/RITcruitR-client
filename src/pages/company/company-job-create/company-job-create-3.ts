import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';

import { CompanyJobCreate4Page } from '@app/pages/company';

import {
  NewJobModel,
  RecruiterModel
} from '@app/models';

import { DataService } from '@app/services';

//=========================================================================
// * CompanyJobCreate3Page                                                   
//=========================================================================
// - Page for the job creation process. This is part 3 of 8.
// - In part 3, the job required skills are entered.
//_________________________________________________________________________
@Component({
  selector: 'page-company-job-create-3',
  templateUrl: 'company-job-create-3.html'
})
export class CompanyJobCreate3Page {
  
  public jobModel: NewJobModel;
  public recruiter: RecruiterModel;
  
  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  skillOptions = [];
  skills = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
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

  /*
    Show an alert dialog explaining required skills.
  */
  reqSkillsInfo() {
    this.showAlert(
      "Required Skills",
      "Required skills are skills that a student must have in order to be matched with a job position. Adding more will refine your matches to ensure applicants are closer to what you're looking for, but too many can result in fewer matches."
    );
  }

  /*
    Remove the skill at the given index from the "instance" list of skills for the job.
  */
  removeSkill(index) {
    this.skills.splice(index, 1);
  }

  /*
    Continue to the next part of job creation.
  */
  continueClicked() {
    if (this.jobForm && this.jobForm.valid && this.skills.length > 0) {
      this.jobModel.requiredSkills = this.skills;
      this.navCtrl.push(CompanyJobCreate4Page, {recruiter: this.recruiter, job: this.jobModel});
    }
    else {
      this.presentToast("Please select at least one required skill. Having no required skills will result in no matches.");
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
