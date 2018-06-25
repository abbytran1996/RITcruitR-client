import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { CompanyTabsPage } from '@app/pages/company';

import { PresentationLinkAddModal } from '@app/pages/modals';

import {
  RecruiterModel,
  PresentationLinkModel
} from '@app/models';

import {
  DataService,
  CompanyService,
  HelperService
} from '@app/services';

//=========================================================================
// * CompanyPresentationLinksPage                                                   
//=========================================================================
// - Page to edit a company's saved profile presentation links.
//_________________________________________________________________________
@Component({
  selector: 'page-company-presentation-links',
  templateUrl: 'company-presentation-links.html'
})
export class CompanyPresentationLinksPage {

  public recruiter: RecruiterModel;
  public loading = false;

  // ngForm object for validation control
  @ViewChild('linksForm') linksForm;
  links = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public dataService: DataService,
    private companyService: CompanyService,
    private helperService: HelperService
  ) {
    this.recruiter = navParams.get("recruiter");
    this.links = this.helperService.sortById(this.recruiter.company.presentationLinks.slice(0), true);
  }

  /*
    Show an alert dialog explaining the presentation phase.
  */
  presentationInfo() {
    this.showAlert(
      "Presentation Links",
      "Presentation links are links to anything you may want to present to an applicant applying to a job you're offering. A link could be to a company video, a company website, a product website, etc. These links can be used later when creating jobs."
    );
  }

  /*
    Remove the presentation link at the given index from the list.
  */
  removeLink(index) {
    this.loading = true;
    let link = new PresentationLinkModel(this.links[index]);

    if (link.id != null) {
      this.companyService.deleteCompanyPresentationLink(this.recruiter.company.id, link.id).subscribe(
        resData => { },
        res => {
          this.links.splice(index, 1);
          this.loading = false;
        }
      );
    }
    else {
      this.links.splice(index, 1);
      this.loading = false;
    }
  }

  /*
    Add a new presentation link to the list. Shows a modal to create a new link.
  */
  addLink() {
    let modal = this.modalCtrl.create(PresentationLinkAddModal, { model: this.recruiter.company, allowExisting: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.loading = true;
        this.companyService.addCompanyPresentationLink(this.recruiter.company.id, data).subscribe(
          resData => {
            this.links.push(resData);
            this.loading = false;
          },
          res => { }
        );
      }
    });
    modal.present();
  }

  /*
    Save the changes to the student presentation links in the model and the DB.
  */
  saveChanges() {
    this.loading = true;
    if (this.linksForm && this.linksForm.valid) {
      this.recruiter.company.presentationLinks = this.links; 
      this.loading = false;
      this.navCtrl.setRoot(CompanyTabsPage);
    }
    else {
      this.presentToast("There was an error saving your presentation links");
      this.loading = false;
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
