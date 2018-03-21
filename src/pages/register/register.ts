import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegisterStudentPage } from './register-student/register-student';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public navCtrl: NavController) {

  }

  backBtn() {
    this.navCtrl.pop();
  }

  studentBtn() {
    this.navCtrl.push(RegisterStudentPage);
  }
}
