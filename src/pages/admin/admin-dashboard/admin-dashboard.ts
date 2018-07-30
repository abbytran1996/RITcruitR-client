import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, Tabs } from 'ionic-angular';

import { LoginPage } from '@app/pages/general';
import { AdminCompanyValidationPage } from '@app/pages/admin';

import {
  UserModel
} from '@app/models';

import {
  DataService
} from '@app/services';

//=========================================================================
// * AdminDashboardPage
//=========================================================================
// - Main page for admins, contains menu to other admin pages.
//_________________________________________________________________________
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html'
})
export class AdminDashboardPage {

  public isApp = true;
  public user: UserModel;

  @ViewChild('adminTabs') tabRef: Tabs;
  public rootPage = AdminCompanyValidationPage;
  public tabParams = {};

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private dataService: DataService
  ) {
    this.isApp = dataService.isApp;
    this.user = new UserModel(navParams.get("user"));
    this.tabParams = {user: this.user};
  }

  /*
    Navigate to the company validation screen.
  */
  companyValidation() {
    this.tabRef.select(0);
  }

  /*
    Logout back to the login screen.
  */
  logout() {
    this.navCtrl.setRoot(LoginPage);
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
