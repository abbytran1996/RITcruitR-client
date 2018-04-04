import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-student-work-experience',
  templateUrl: 'student-work-experience.html'
})
export class StudentWorkExperiencePage {

  public user: any;
  public isSetup = false;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
    this.user = navParams.get("user");

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
  }

  continueClicked() {
    this.navCtrl.push(TabsPage, {user: this.user});
  }

  skipClicked() {
    this.navCtrl.push(TabsPage, {user: this.user, setup: true});
  }

  saveClicked() {
    this.navCtrl.setRoot(TabsPage, {message: "Work experience updated successfully"});
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
