import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-company-phase-1',
  templateUrl: 'company-phase-1.html'
})
export class CompanyPhase1Page {

  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user= navParams.get("user");
  }
}
