import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { CompanyRegisterConfirmPage } from '../company-register-confirm/company-register-confirm';

import { CompanyRegisterModel } from '../../models/company-register.model';
import { RecruiterRegisterModel } from '../../models/recruiter-register.model';
import { RecruiterContactModel } from '../../models/recruiter-contact.model';

@Component({
  selector: 'page-recruiter-contact',
  templateUrl: 'recruiter-contact.html'
})
export class RecruiterContactPage {

  public user: any;
  public companyId: any;
  public isSetup = false;
  public isEdit = false;

  // ngForm object for validation control
  @ViewChild('contactForm') contactForm;

  // Form models
  companyModel = new CompanyRegisterModel("", "", "", null, "");
  recruiterModel = new RecruiterRegisterModel("", "", "", "");
  model = new RecruiterContactModel("", "");

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.companyModel = navParams.get("company");
    this.recruiterModel = navParams.get("recruiter");

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }

    if (navParams.get("edit") == true) {
      this.isEdit = true;

      // TODO: Add call or use incoming data to set the model to the existing data.
      this.model.contactEmail = "contact@example.com";
      this.model.phone = "716-123-4567";
    }
  }

  continueClicked() {
    if (this.contactForm && this.contactForm.valid) {
      if (this.isSetup) {
        // TODO: Call API to create company.
        // TODO: Call API to create recruiter.
        // TODO: Call API to create contact info (this could be bundled into the previous step in the future).
        this.navCtrl.push(CompanyRegisterConfirmPage, {user: this.user}); // TODO: Update this to send the actual user created.
      }
      else {
        // TODO: Call API to create recruiter.
        // TODO: Call API to create contact info (this could be bundled into the previous step in the future).
        this.navCtrl.setRoot(TabsPage, {message: "New recruiter added successfully"});
      }
    }
    else {
      this.presentToast("Please enter a contact email and a phone number");
    }
  }

  saveClicked() {
    if (this.contactForm && this.contactForm.valid) {
      // TODO: Call API to update contact info
      this.navCtrl.setRoot(TabsPage, {message: "Contact Information updated successfully"});
    }
    else {
      this.presentToast("Please enter a contact email and a phone number");
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
