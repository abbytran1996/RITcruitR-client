import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-company-phase-2',
  templateUrl: 'company-phase-2.html'
})
export class CompanyPhase2Page {

  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user= navParams.get("user");
  }
}
