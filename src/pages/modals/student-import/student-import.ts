import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import {
  StudentModel
} from '@app/models';

import {
  HelperService,
  DataService,
  StudentService
} from '@app/services';

//=========================================================================
// * StudentImportModal                                                   
//=========================================================================
// - Modal to enter information for student profile import.
//_________________________________________________________________________
@Component({
  selector: 'modal-student-import',
  templateUrl: 'student-import.html'
})
export class StudentImportModal {

  public pageLoading = true;
  public saving = false;
  public student: StudentModel;
  
  @ViewChild('form') form;
  public authData = {
    api: "portfolium",
    email: "",
    password: ""
  };

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public helperService: HelperService,
    private dataService: DataService,
    private studentService: StudentService
  ) {
    this.student = navParams.get("student");
    this.pageLoading = false;
  }

  /*
    Dismiss the modal with no data and return to the previous screen.
  */
  backClicked() {
    this.viewCtrl.dismiss();
  }

  /*
    Handles some basic validation and dismisses the modal.
  */
  doneClicked() {
    this.saving = true;

    if (this.form.valid) {

      // Change below to subscribe function when an actual API call is being made.
      // Remove the conditional, and move its logic into the proper subscribe callbacks.
      let resData = this.studentService.importStudentProfile(this.student, this.authData);

      if (this.authData.email != "error@example.com") {
        // Put in first subscribe callback
        this.student = resData;
        this.saving = false;
        this.viewCtrl.dismiss(this.student);
      }
      else {
        // Put in second subscribe callback
        this.presentToast("Sorry, but we were unable import a profile with the given credentials");
        this.saving = false;
      }
    }
    else {
      this.presentToast("Please enter a valid value for each field");
      this.saving = false;
    }
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
