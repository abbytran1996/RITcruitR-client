import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user= navParams.get("user");
  }
}
