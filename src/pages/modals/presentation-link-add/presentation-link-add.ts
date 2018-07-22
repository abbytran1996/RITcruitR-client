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

  public newLinkModel = new PresentationLinkModel();
  public saveLink: boolean = false;
  public existingLinkModel = undefined;
  public existingLinkOptions = [];
  public model;
  public allowExisting = true;

  public linkTypes = [
    {
      text: "Basic Link",
      value: "basic",
      title: "BASIC LINK",
      icon: "md-link",
      color: "#000000",
      fields: [
        { type: "text", label: "LINK URL", name: "linkUrl", value: "", required: true }
      ],
      generateLink: (fields) => {
        let regex = new RegExp("^(https?|ftp)://.*$");
        let link = String(fields[0].value);

        if (!regex.test(link)) {
          link = "http://" + link;
        }

        return link;
      }
    },
    {
      text: "YouTube Video",
      value: "youtube",
      title: "YOUTUBE",
      icon: "logo-youtube",
      color: "#eb3324",
      fields: [
        { type: "text", label: "VIDEO ID", name: "videoID", value: "", required: true }
      ],
      generateLink: (fields) => {
        let ytUrl = "https://www.youtube.com/watch?v=";
        let videoId = fields[0].value;

        return ytUrl + videoId;
      }
    },
    {
      text: "GitHub",
      value: "github",
      title: "GITHUB",
      icon: "logo-github",
      color: "#000000",
      fields: [
        { type: "text", label: "GITHUB USERNAME", name: "githubUsername", value: "", required: true },
        { type: "text", label: "GITHUB REPOSITORY NAME (OPTIONAL)", name: "githubRepo", value: "", required: false }
      ],
      generateLink: (fields) => {
        let ghUrl = "https://github.com/";
        let username = fields[0].value;
        let repo = fields[1].value;

        return ghUrl + username + "/" + repo;
      }
    }
  ];
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
    this.allowExisting = navParams.get("allowExisting");
    if (this.allowExisting == undefined) this.allowExisting = true;
    this.existingLinkOptions = this.helperService.sortById(this.model.presentationLinks, true);

    // Link type fields initialization
    this.linkTypeCurrent = this.linkTypes[this.linkTypeIndex];
  }

  /*
    Show an alert dialog explaining what a student presentation phase is.
  */
  yourPresentationInfo() {
    this.showAlert(
      "Your Presentation",
      "This is your chance to show the recruiter anything of yours that you would like to share. This could be a link to a video of yourself, a project link, a personal website, or anything else."
    );
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
        this.presentToast("Please enter a value for all of the required fields");
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
    // Link generation
    this.newLinkModel.link = this.linkTypeCurrent.generateLink(this.linkTypeCurrent.fields);

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
    Called when a value is selected from the link type select box.
  */
  typeChanged(event) {
    this.linkTypeCurrent = this.linkTypes[this.linkTypeIndex];
    this.linkTypeCurrent.fields.forEach((field) => {
      field.value = undefined;
    });
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
