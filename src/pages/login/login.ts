import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

import { LoginForm } from '../../forms/login.form';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

  }

  // ngForm object for validation control
  @ViewChild('loginForm') loginForm;

  // Form model for login fields
  model = new LoginForm("", "");

  // Called when login button is clicked, attempt to authenticate user
  login() {
    if (this.loginForm && this.loginForm.valid) {
      this.navCtrl.push(TabsPage);
    }
    else {
      this.presentToast("Please enter a valid email and password");
    }
  }

  // Called when the register button is clicked, navigate to register screen
  register() {
    this.navCtrl.push(RegisterPage);
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
