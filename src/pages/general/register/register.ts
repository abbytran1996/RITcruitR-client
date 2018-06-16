import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StudentRegisterPage } from '@app/pages/student';
import { CompanyRegisterPage } from '@app/pages/company';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController
  ) {}

  backBtn() {
    this.navCtrl.pop();
  }

  studentBtn() {
    this.navCtrl.push(StudentRegisterPage);
  }

  companyBtn() {
    this.navCtrl.push(CompanyRegisterPage);
  }
}
