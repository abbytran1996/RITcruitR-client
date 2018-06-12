import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { CompanyTabsPage } from '@app/pages/company';
import { PresentationLinkAddModal } from '@app/pages/modals';

import {
  NewJobModel,
  RecruiterModel
} from '@app/models';

import { JobPostingService } from '@app/services';

// TODO: Remove - TEMP lists, replace with API calls
const videos = [{text: "Company Advertisement Video", id: 0}, {text: "UI Developer Video", id: 1}];

//=========================================================================
// * CompanyJobCreate8Page                                                   
//=========================================================================
// - Page for the job creation process. This is part 8 of 8.
// - In part 8, the job presentation links are entered.
// - This is ther last part, the job will be created after finishing.
//_________________________________________________________________________
@Component({
  selector: 'page-company-job-create-8',
  templateUrl: 'company-job-create-8.html'
})
export class CompanyJobCreate8Page {

  public jobModel: NewJobModel;
  public recruiter: RecruiterModel;

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  videoOptions = videos;

  // Reorder list of presentation links
  public linksList = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public jobPostingService: JobPostingService
  ) {
    this.recruiter = navParams.get("recruiter");
    this.jobModel = navParams.get("job");
  }

  /*
    Show an alert dialog explaining the presentation phase.
  */
  presentationInfo() {
    this.showAlert(
      "Presentation Links",
      "Provide any links that you would like students to see when applying to the job. A link could be to a company video, a website, or anything else you'd like."
    );
  }

  /*
    Remove the presentation link at the given index from the "instance" list of links.
  */
  removeLink(index) {
    this.linksList.splice(index, 1);
  }

  /*
    Add a new presentation link to the list for this job. Shows a modal to choose
    profile link or create a new one.
  */
  addLink() {
    let modal = this.modalCtrl.create(PresentationLinkAddModal, { model: this.recruiter.company });
    modal.onDidDismiss(data => {
      if (data) {
        this.linksList.push(data);
      }
    });
    modal.present();
  }

  /*
    Finished entering job data for asll parts, create the job in the DB and return
    to the company tabs page.
  */
  finishClicked() {
    if (this.linksList && this.linksList.length > 0 && this.linksList.length <= 3) {
      this.jobModel.presentationLinks = this.linksList;
      this.jobModel.recruiterId = this.recruiter.id;
      this.jobModel.niceToHaveSkillsWeight = this.jobModel.niceToHaveSkillsWeight / 100;
      this.jobModel.matchThreshold = this.jobModel.matchThreshold / 100;

      // Create the job using the API
      this.jobPostingService.addJob(this.recruiter.company.id, this.jobModel).subscribe(
        data => {
          this.navCtrl.setRoot(CompanyTabsPage, {message: "New job successfully created"});
        },
        error => {
          this.presentToast("There was an error creating the job, please try again later");
        }
      );
    }
    else {
      this.presentToast("Please add at least one, and at most three presentation link(s) for applicants to view.");
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
