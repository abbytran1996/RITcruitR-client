import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    this.user= navParams.get("user");
  }

  logout() {
    this.authService.logout();
  }
}
