import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import {
  PresentationLinkModel,
  StudentModel,
  CompanyModel
} from '@app/models';

import {
  HelperService,
  StudentService,
  CompanyService
} from '@app/services';

//=========================================================================
// * PresentationLinkAddModal                                                   
//=========================================================================
// - Modal to add a presentation link to a match or job.
// - An existing profile link can be selected, or a new one can be created
//   and saved.
//_________________________________________________________________________
@Component({
  selector: 'modal-presentation-link-add',
  templateUrl: 'presentation-link-add.html'
})
export class PresentationLinkAddModal {

  @ViewChild('existingForm') existingForm;
  @ViewChild('newForm') newForm;

  public newLinkModel = new PresentationLinkModel();
  public saveLink: boolean = false;
  public existingLinkModel = undefined;
  public existingLinkOptions = [];
  public model;
  public allowExisting = true;

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private helperService: HelperService,
    private studentService: StudentService,
    private companyService: CompanyService
  ) {
    this.model = navParams.get("model") || { presentationLinks: [] };
    this.allowExisting = navParams.get("allowExisting");
    if (this.allowExisting == undefined) this.allowExisting = true;
    this.existingLinkOptions = this.helperService.sortById(this.model.presentationLinks, true);
  }

  /*
    Show an alert dialog explaining what a student presentation phase is.
  */
  yourPresentationInfo() {
    if (this.model instanceof StudentModel) {
      this.showAlert(
        "Presentation Links",
        "Presentation links are links to anything you may want an employer to see when applying to a job. A link could be to a video of yourself, a personal website, a project you've worked on, etc. These links will be used later when applying to jobs."
      );
    }
    else if (this.model instanceof CompanyModel) {
      this.showAlert(
        "Presentation Links",
        "Presentation links are links to anything you may want to present to an applicant applying to a job you're offering. A link could be to a company video, a company website, a product website, etc. These links can be used later when creating jobs."
      );
    }
  }

  /*
    Dismiss the modal with no data and return to the previous screen.
  */
  backClicked() {
    this.viewCtrl.dismiss();
  }

  /*
    Called when finished creating the presentation link.
    Contains more "advanced" validation logic based on the two
    forms. Either the existing link or new link form must be
    valid.
  */
  doneClicked() {
    // New form valid, existing not
    if (this.newForm && this.newForm.valid && this.existingForm && this.existingLinkModel == undefined) {
      this.dismissNew();
    }

    // Existing form valid, new form not
    else if (this.newForm && !this.newForm.valid && this.existingForm && this.existingLinkModel != undefined) {
      this.dismissExisting();
    }

    // Both forms valid
    else if (this.newForm && this.newForm.valid && this.existingForm && this.existingLinkModel != undefined) {
      this.dismissNew();
    }

    // Neither form valid
    else {
      if (this.allowExisting) {
        this.presentToast("Please either select an existing presentation link, or create a new one");
      }
      else {
        this.presentToast("Please enter a link title and url");
      }
    }
  }

  /*
    Dismiss the modal and send back the selected existing presentation link
  */
  dismissExisting() {
    this.viewCtrl.dismiss(this.existingLinkModel);
  }

  /*
    Dismiss the modal and send back the newly created presentation link.
  */
  dismissNew() {
    if (this.saveLink) {
      if (this.model instanceof StudentModel) {
        this.studentService.addStudentPresentationLink(this.model.id, this.newLinkModel).subscribe(
          resData => {
            this.model.presentationLinks.push(resData);
            this.viewCtrl.dismiss(resData);
          },
          res => { }
        );
      }
      else if (this.model instanceof CompanyModel) {
        this.companyService.addCompanyPresentationLink(this.model.id, this.newLinkModel).subscribe(
          resData => {
            this.model.presentationLinks.push(resData);
            this.viewCtrl.dismiss(resData);
          },
          res => { }
        );
      }
    }
    else {
      this.viewCtrl.dismiss(this.newLinkModel);
    }
  }

  /*
    Called when the select field value for the existing presentation links is changed.
    Needed because Ionic doesn't provide the option to deselect options.
  */
  selectChanged() {
    if (this.existingLinkModel == -1) {
      this.existingLinkModel = undefined;
      this.existingForm.reset();
    }
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
