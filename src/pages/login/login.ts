import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

import { LoginModel } from '../../models/login.model';

import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  // ngForm object for validation control
  @ViewChild('loginForm') loginForm;

  // Form model for login fields
  model = new LoginModel("", "");

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private authService: AuthService) {

  }

  // Called when login button is clicked, attempt to authenticate user
  login() {
    if (this.loginForm && this.loginForm.valid) {
      // Make API call to login
      this.authService.login(this.model).subscribe(
        data => {
          this.authService.setLocalVars(data);
          this.navCtrl.push(TabsPage);
        },
        error => {
          this.presentToast("No user found with that email and password combination");
        }
      );
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
      position: 'top',
      showCloseButton: true,
      closeButtonText: ''
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
