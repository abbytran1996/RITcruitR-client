import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentJobPreferencesPage } from '../student-job-preferences/student-job-preferences';

import { StudentContactModel } from '../../models/student-contact.model';

@Component({
  selector: 'page-student-contact',
  templateUrl: 'student-contact.html'
})
export class StudentContactPage {

  public user: any;
  public isSetup = false;

  // ngForm object for validation control
  @ViewChild('contactForm') contactForm;

  // Form models
  model = new StudentContactModel("", "", "");

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.user = navParams.get("user");

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
    else {
      // TODO: Add call or use incoming data to set the model to the existing data.
      this.model.contactEmail = "contact@example.com";
      this.model.phone = "716-123-4567";
      this.model.website = "www.example.com";
    }
  }

  continueClicked() {
    if (this.contactForm && this.contactForm.valid) {
      // TODO: Call API to create contact info
      this.navCtrl.push(StudentJobPreferencesPage, {user: this.user, setup: true});
    }
    else {
      this.presentToast("Please enter a contact email and a phone number. Website is optional");
    }
  }

  saveClicked() {
    if (this.contactForm && this.contactForm.valid) {
      // TODO: Call API to update contact info
      this.navCtrl.setRoot(TabsPage, {message: "Contact Information updated successfully"});
    }
    else {
      this.presentToast("Please enter a contact email and a phone number. Website is optional");
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
}