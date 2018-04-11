import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { RecruiterRegisterPage } from '../recruiter-register/recruiter-register';

const companies = ["Intuit", "Microsoft", "Apple"];

// TODO: This page isn't used at all anymore, leaving here for now because
// this is the last remnants of the old typeahead field. We may want to use
// it later for something (web portal).
@Component({
  selector: 'page-recruiter-company-select',
  templateUrl: 'recruiter-company-select.html'
})
export class RecruiterCompanySelectPage {

  // ngForm object for validation control
  @ViewChild('companyForm') companyForm;

  // Form model for inputs
  public model: any;

  // Variables for the typeahead searching
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? companies : companies.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  // Attempt to register the recruiter
  continueBtn() {
    if (this.companyForm && this.companyForm.valid) {
      this.navCtrl.push(RecruiterRegisterPage, {company: this.model});
    }
    else {
      this.presentToast("Please select a company in the list of registered companies. If your company cannot be found in the list, register your company by tapping the button at the bottom of the screen", 5000);
    }
  }

  newCompanyBtn() {
    this.presentToast("Company creation is an upcoming feature to be implemented next iteration!", 4000);
  }

  // Navigate back to the previous screen
  backBtn() {
    this.navCtrl.pop();
  }

  // Present a toast message to the user
  presentToast(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      showCloseButton: true,
      closeButtonText: ''
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
