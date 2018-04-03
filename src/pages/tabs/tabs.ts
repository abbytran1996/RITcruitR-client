import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { StudentPhase1Page } from '../student-home/student-phase-1';
import { StudentPhase2Page } from '../student-home/student-phase-2';
import { StudentPhase3Page } from '../student-home/student-phase-3';
import { StudentProfileDetailsPage } from '../student-profile-details/student-profile-details';
import { LoginPage } from '../login/login';

import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  showStudentTabs = true;

  studentPhase1Tab = StudentPhase1Page;
  studentPhase2Tab = StudentPhase2Page;
  studentPhase3Tab = StudentPhase3Page;

  public user: any;
  public tabParams: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, private authService: AuthService) {
    this.user = navParams.get("user");

    // If a user was sent, get its role type to properly build the tabs and menu.
    if (this.user != undefined) {
      this.user.roles.forEach(role => {
        if (role.name == "student") {
          this.showStudentTabs = true;
        }
        else {
          this.showStudentTabs = false;
        }
      });
    }

    // Set the user in the tab params so each tab has access.
    this.tabParams = {user: this.user};

    // If a message was sent with nav params, show it.
    let message = navParams.get("message");
    if (message) {
      this.presentToast(message);
    }
  }

  editStudentDetails() {
    this.navCtrl.push(StudentProfileDetailsPage);
  }

  // Logout the current user and return to the login screen.
  logout() {
    this.authService.logout();
    this.navCtrl.push(LoginPage, {}, {animate: true, animation: "md-transition"});
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
