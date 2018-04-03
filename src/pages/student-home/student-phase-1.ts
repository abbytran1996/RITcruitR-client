import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'page-student-phase-1',
  templateUrl: 'student-phase-1.html'
})
export class StudentPhase1Page {

  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    this.user= navParams.get("user");
  }

  logout() {
    this.authService.logout();
  }
}
