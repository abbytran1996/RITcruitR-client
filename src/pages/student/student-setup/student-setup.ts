import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { StudentDetailFormsPage } from '@app/pages/student';
import { StudentImportModal } from '@app/pages/modals';

import { StudentModel } from '@app/models';

//=========================================================================
// * StudentSetupPage                                                   
//=========================================================================
// - "Info" page to thank the student for signing up and introducing the
//   following setup process.
//_________________________________________________________________________
@Component({
  selector: 'page-student-setup',
  templateUrl: 'student-setup.html'
})
export class StudentSetupPage {

  public student: StudentModel;
  public importEnabled = true;
  public fromLogin = false;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    this.student = navParams.get("student");
    this.fromLogin = navParams.get("fromLogin") || false;
  }

  /*
    Continue to the first setup page.
  */
  continueClicked() {
    this.navCtrl.push(StudentDetailFormsPage, {student: this.student, setup: true, importEnabled: this.importEnabled});
  }

  /*
    Called when the import button is clicked. Begin the student profile import process.
  */
  importProfile() {
    let modal = this.modalCtrl.create(StudentImportModal, { student: this.student });
    modal.onDidDismiss(data => {
      if (data != undefined) {
        this.student = data;

        let alert = this.alertCtrl.create({
          title: 'Import Successful!',
          message: 'Your profile data has been found! Any info we were able to obtain will be filled into the corresponding fields in the setup screens. Any information that could not be obtained must still be entered.',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.continueClicked();
              }
            }
          ]
        });

        alert.present();
      }
    });
    modal.present();
  }
}
