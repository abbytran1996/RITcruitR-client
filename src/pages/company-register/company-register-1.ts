import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { CompanyRegisterModel } from '../../models/company-register.model';

@Component({
  selector: 'page-company-register-1',
  templateUrl: 'company-register-1.html'
})
export class CompanyRegister1Page {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    // this.user = navParams.get("user");
  }

  // ngForm object for validation control
  @ViewChild('companyForm') companyForm;

  // Form model for education fields
  model = new CompanyRegisterModel("", "", "", "", "");

  continueClicked() {
    // if (this.educationForm && this.educationForm.valid) {
    //   this.navCtrl.push(TabsPage, {user: this.user.user});
    // }
    // else {
    //   this.presentToast("Please enter your university name, major, GPA, and expected graduation date");
    // }
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
      position: 'top'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
