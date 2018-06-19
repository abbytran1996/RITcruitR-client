import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  UserModel
} from '@app/models';

import {
  DataService
} from '@app/services';

//=========================================================================
// * AdminCompanyValidationPage
//=========================================================================
// - Page for admins to view registered companies and validate them,
//   approving the company to use the application.
//_________________________________________________________________________
@Component({
  selector: 'page-admin-company-validation',
  templateUrl: 'admin-company-validation.html'
})
export class AdminCompanyValidationPage {

  public isApp = true;
  public user: UserModel;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private dataService: DataService
  ) {
    this.isApp = dataService.isApp;
    this.user = navParams.get("user");
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
