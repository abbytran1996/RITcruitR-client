import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { TabsPage } from '../../tabs/tabs';

import { RegisterStudentForm } from '../../../forms/register-student.form';

@Component({
  selector: 'page-register-student',
  templateUrl: 'register-student.html'
})
export class RegisterStudentPage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;

  // Form model for register fields
  model = new RegisterStudentForm("", "", "", "");

  // Attempt to register the student
  register() {
    if (this.registerForm && this.registerForm.valid) {
      this.navCtrl.push(TabsPage);
    }
    else {
      this.presentToast("Please enter a valid email, password, full name, and university");
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
