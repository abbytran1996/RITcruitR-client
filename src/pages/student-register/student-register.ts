import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentSetupPage } from '../student-setup/student-setup';

import { StudentRegisterModel } from '../../models/student-register.model';

@Component({
  selector: 'page-student-register',
  templateUrl: 'student-register.html'
})
export class StudentRegisterPage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;

  // Form model for register fields
  model = new StudentRegisterModel("", "", "", "");

  // Attempt to register the student
  register() {
    if (this.registerForm && this.registerForm.valid) {
      this.navCtrl.push(StudentSetupPage);
    }
    else {
      this.presentToast("Please enter a valid email, password, first name, and last name");
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
      position: 'top'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
