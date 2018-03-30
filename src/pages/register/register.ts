import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StudentRegisterPage } from '../student-register/student-register';
import { CompanyRegister1Page } from '../company-register/company-register-1';

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
    this.navCtrl.push(StudentRegisterPage);
  }

  companyBtn() {
    this.navCtrl.push(CompanyRegister1Page);
  }
}
