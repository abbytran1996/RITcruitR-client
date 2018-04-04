import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-company-phase-3',
  templateUrl: 'company-phase-3.html'
})
export class CompanyPhase3Page {

  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user= navParams.get("user");
  }
}
