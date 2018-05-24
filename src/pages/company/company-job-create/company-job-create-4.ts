import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';

import { CompanyJobCreate5Page } from '@app/pages/company';

import {
  NewJobModel,
  RecruiterModel
} from '@app/models';

import { DataService } from '@app/services';

//=========================================================================
// * CompanyJobCreate4Page                                                   
//=========================================================================
// - Page for the job creation process. This is part 4 of 8.
// - In part 4, the job nice to have skills are entered.
//_________________________________________________________________________
@Component({
  selector: 'page-company-job-create-4',
  templateUrl: 'company-job-create-4.html'
})
export class CompanyJobCreate4Page {

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
        this.removeSkillOptions(this.jobModel.requiredSkills);
      },
      error => {
        this.presentToast("There was an error retrieving the list of skills, please try again");
      }
    );
  }

  /* 
    Show an alert dialog explaining nice to have skills weight.
  */
  nthSkillsWeightInfo() {
    this.showAlert(
      "Nice to Have Skills Weight",
      "Nice to have skills weight determines how heavily these skills will be used for matching. A higher number means a student will need to have more of these skills in order to be matched."
    );
  }

  /* 
    Show an alert dialog explaining nice to have skills.
  */
  nthSkillsInfo() {
    this.showAlert(
      "Nice to Have Skills",
      "Nice to have skills are skills for the job that are not required to be matched, but a student having one or more of these skills would be a plus for them. Matching on nice to have skills will improve a student's match score, showing them further towards the top of the list."
    );
  }

  /*
    Remove the skill at the given index from the "instance" list of skills for the job.
  */
  removeSkill(index) {
    this.skills.splice(index, 1);
  }

  /*
    Remove the given array of skills from the skills options.
    Used to remove skills selected as required skills from the previous
    step to prevent duplicates.
  */
  removeSkillOptions(toRemove) {
    let values = toRemove;

    values.forEach(value => {
      let skillIndex = this.skillOptions.findIndex(skill => skill.id == value.id);
      if (skillIndex != undefined && skillIndex > -1) {
        this.skillOptions.splice(skillIndex, 1);
      }
    });
  }

  /*
    Continue to the next part of job creation.
  */
  continueClicked() {
    if (this.jobForm && this.jobForm.valid) {
      this.jobModel.niceToHaveSkills = this.skills;
      this.navCtrl.push(CompanyJobCreate5Page, {recruiter: this.recruiter, job: this.jobModel});
    }
    else {
      this.presentToast("There is a problem with the skills you have selected, please review them and try again");
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
