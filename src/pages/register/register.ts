import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StudentRegisterPage } from '../student-register/student-register';
import { RecruiterCompanySelectPage } from '../recruiter-company-select/recruiter-company-select';

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

  recruiterBtn() {
    this.navCtrl.push(RecruiterCompanySelectPage);
  }
}
