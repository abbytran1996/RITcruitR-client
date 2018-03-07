import { Component } from '@angular/core';

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

  constructor() {

  }
}
