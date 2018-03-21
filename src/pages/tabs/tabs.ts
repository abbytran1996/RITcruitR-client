import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AccountPage } from '../account/account';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeTab = HomePage;
  accountTab = AccountPage;
  tab3Root = ContactPage;

  public user: any;
  public homeTabParams: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get("user");
    this.homeTabParams = {user: this.user};
  }
}
