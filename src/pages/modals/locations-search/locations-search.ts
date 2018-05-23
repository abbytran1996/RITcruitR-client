import { Component, ViewChild } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// TEMP lists, replace with API calls
const locations = ['Buffalo, New York', 'Rochester, New York', 'New York City, New York', 'San Jose, California', 'Seattle, Washington'];

@Component({
  selector: 'modal-locations-search',
  templateUrl: 'locations-search.html'
})
export class LocationsSearchModal {

  locationsModel: any;

  // Variables for the typeahead searching
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? locations : locations.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {

  }

  backClicked() {
    this.viewCtrl.dismiss();
  }

  doneClicked() {
    this.viewCtrl.dismiss();
  }
}
