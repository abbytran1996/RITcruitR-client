import { Component, ViewChild } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, ToastController } from 'ionic-angular';

@Component({
  selector: 'modal-presentation-link-add',
  templateUrl: 'presentation-link-add.html'
})
export class PresentationLinkAddModal {

  @ViewChild('existingForm') existingForm;
  @ViewChild('newForm') newForm;

  public newLinkModel = {title: "", link: "", save: false};
  public existingLinkModel = undefined;
  public existingLinkOptions = [];
  public model = { presentationLinks: [] };

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController
  ) {
    this.model = navParams.get("model");
    this.existingLinkOptions = this.model.presentationLinks;
  }

  backClicked() {
    this.viewCtrl.dismiss();
  }

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
      this.presentToast("Please either select an existing presentation link, or create a new one");
    }
  }

  dismissExisting() {
    this.viewCtrl.dismiss(this.existingLinkModel);
  }

  dismissNew() {
    // TODO: Add service call to save new link to profile
    this.viewCtrl.dismiss(this.newLinkModel);
  }

  selectChanged() {
    if (this.existingLinkModel == -1) {
      this.existingLinkModel = undefined;
      this.existingForm.reset();
    }
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
