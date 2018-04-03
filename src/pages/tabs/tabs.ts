import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { AccountPage } from '../account/account';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeTab = HomePage;
  accountTab = AccountPage;
  tab3Root = ContactPage;

  public user: any;
  public homeTabParams: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.user = navParams.get("user");
    this.homeTabParams = {user: this.user};

    let message = navParams.get("message");
    if (message) {
      this.presentToast(message);
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
