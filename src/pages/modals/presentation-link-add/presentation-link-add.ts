import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import {
  PresentationLinkModel,
  PresentationLinkDBModel,
  StudentModel,
  CompanyModel
} from '@app/models';

import {
  HelperService,
  StudentService,
  CompanyService,
  DataService
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

  public newLinkModel = new PresentationLinkDBModel();
  public saveLink: boolean = false;
  public model;
  public allowSave = false;
  public saving = false;

  public linkTypes = [];
  public linkTypeIndex = 0;
  public linkTypeCurrent = undefined;

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private helperService: HelperService,
    private studentService: StudentService,
    private companyService: CompanyService,
    private dataService: DataService
  ) {
    this.model = navParams.get("model") || { presentationLinks: [] };

    this.allowSave = navParams.get("allowSave");
    if (this.allowSave == undefined) this.allowSave = false;

    // Link type fields initialization
    this.linkTypes = this.helperService.getPresentationLinkTypes();
    this.linkTypeCurrent = this.linkTypes[this.linkTypeIndex];
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
    if (this.newForm && this.newForm.valid) {
      this.dismissNew();
    }
    else {
      this.presentToast("Please enter a value for all of the required fields");
    }
  }

  /*
    Dismiss the modal and send back the newly created presentation link.
  */
  dismissNew() {
    // Link generation
    this.newLinkModel.link = this.linkTypeCurrent.generateLink(this.linkTypeCurrent.fields);

    if (this.saveLink) {
      this.saving = true;

      if (this.model instanceof StudentModel) {
        this.studentService.addStudentPresentationLink(this.model.id, this.newLinkModel).subscribe(
          resData => {
            this.model.presentationLinks.push(resData);
            this.saving = false;
            this.viewCtrl.dismiss(resData);
          },
          res => { }
        );
      }
      else if (this.model instanceof CompanyModel) {
        this.companyService.addCompanyPresentationLink(this.model.id, this.newLinkModel).subscribe(
          resData => {
            this.model.presentationLinks.push(resData);
            this.saving = false;
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
    Called when a value is selected from the link type select box.
  */
  typeChanged(event) {
    this.linkTypeCurrent = this.linkTypes[this.linkTypeIndex];
    this.linkTypeCurrent.fields.forEach((field) => {
      field.value = undefined;
    });
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
