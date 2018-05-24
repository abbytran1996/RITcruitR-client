import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { RecruiterContactPage } from '@app/pages/company';

import {
  CompanyRegisterModel,
  RecruiterRegisterModel
} from '@app/models';

//=========================================================================
// * RecruiterRegisterPage
//=========================================================================
// - Page to enter recruiter info to register a new recruiter.
//_________________________________________________________________________
@Component({
  selector: 'page-recruiter-register',
  templateUrl: 'recruiter-register.html'
})
export class RecruiterRegisterPage {

  public companyModel: CompanyRegisterModel;
  public recruiterModel = new RecruiterRegisterModel();

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;
  isSetup = false;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.companyModel = navParams.get("company");

    // Determine if in setup or not
    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
  }

  /*
    Continue to the recruiter contact page to complete recruiter registration there.
  */
  continueClicked() {
    if (this.registerForm && this.registerForm.valid) {
      this.recruiterModel.passwordConfirm = this.recruiterModel.password;
      this.navCtrl.push(RecruiterContactPage, {
        company: this.companyModel,
        recruiter: this.recruiterModel,
        setup: (this.isSetup)
      });
    }
    else {
      this.presentToast("Please enter a valid email, password, first name, and last name");
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
}
