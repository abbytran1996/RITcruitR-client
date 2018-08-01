import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import {
  RecruiterModel
} from '@app/models';

import {
  HelperService,
  DataService,
  RecruiterService,
  AuthService
} from '@app/services';

//=========================================================================
// * RecruiterDetailsModal                                                   
//=========================================================================
// - Modal to view and edit some recruiter details.
//_________________________________________________________________________
@Component({
  selector: 'modal-recruiter-details',
  templateUrl: 'recruiter-details.html'
})
export class RecruiterDetailsModal {

  public pageLoading = true;
  public recruiterSelf: RecruiterModel;
  public recruiterShown: RecruiterModel;
  public isSelf = false;
  public isPrimary = false;
  public ogPrimary = false;

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public helperService: HelperService,
    private dataService: DataService,
    private recruiterService: RecruiterService,
    private authService: AuthService
  ) {
    this.recruiterSelf = navParams.get("recruiterSelf");
    this.recruiterShown = navParams.get("recruiterShown");

    if (this.recruiterSelf.id == this.recruiterShown.id) this.isSelf = true;
    if (this.authService.getUserRole(this.recruiterShown.user) == AuthService.PRIMARY_RECRUITER){
      this.isPrimary = true;
      this.ogPrimary = true;
    }

    this.pageLoading = false;
  }

  /*
    Dismiss the modal with no data and return to the previous screen.
  */
  backClicked() {
    this.viewCtrl.dismiss({change: false});
  }

  /*
    Called when finished editing the recruiter.
  */
  doneClicked() {
    this.viewCtrl.dismiss({change: true, isPrimary: this.isPrimary, ogPrimary: this.ogPrimary});
  }

  /*
    Present a toast message to the user.
  */
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: ''
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }

  /*
    Show an alert dialog with the given title and message.
  */
  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
