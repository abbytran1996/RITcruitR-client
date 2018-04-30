import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { CompanyTabsPage } from '../company-tabs/company-tabs';
import { PresentationLinkAddModal } from '../../modals/presentation-link-add/presentation-link-add';

import { NewJobModel } from '../../models/new-job.model';
import { JobModel } from '../../models/job.model';
import { RecruiterModel } from '../../models/recruiter.model';

import { JobPostingService } from '../../app/services/job-posting.service';

// TEMP lists, replace with API calls
const videos = [{text: "Company Advertisement Video", id: 0}, {text: "UI Developer Video", id: 1}];

@Component({
  selector: 'page-company-job-create-8',
  templateUrl: 'company-job-create-8.html'
})
export class CompanyJobCreate8Page {

  // ngForm object for validation control
  @ViewChild('jobForm') jobForm;

  jobModel: NewJobModel;
  recruiter: RecruiterModel;

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

  presentationInfo() {
    this.showAlert(
      "Presentation Links",
      "Provide any links that you would like students to see when applying to the job. A link could be to a company video, a website, or anything else you'd like."
    );
  }

  removeLink(index) {
    this.linksList.splice(index, 1);
  }

  addLink() {
    let modal = this.modalCtrl.create(PresentationLinkAddModal, { model: this.recruiter.company });
    modal.onDidDismiss(data => {
      if (data) {
        this.linksList.push(data);
      }
    });
    modal.present();
  }

  finishClicked() {
    if (this.linksList && this.linksList.length > 0 && this.linksList.length <= 3) {
      this.jobModel.presentationLinks = this.linksList;
      this.jobModel.recruiterId = this.recruiter.id;
      this.jobModel.niceToHaveSkillsWeight = this.jobModel.niceToHaveSkillsWeight / 100;
      this.jobModel.matchThreshold = this.jobModel.matchThreshold / 100;

      // Create the job using the API
      this.jobPostingService.addJob(this.recruiter.company.id, this.jobModel).subscribe(
        data => {
          let job = JobModel.createJobFromApiData(data);
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

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
