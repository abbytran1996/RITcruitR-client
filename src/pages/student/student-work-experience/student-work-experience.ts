import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { StudentTabsPage } from '@app/pages/student';

import { StudentModel } from '@app/models';

//=========================================================================
// * StudentWorkExperiencePage                                                   
//=========================================================================
// - Page to edit student work experience.
//_________________________________________________________________________
@Component({
  selector: 'page-student-work-experience',
  templateUrl: 'student-work-experience.html'
})
export class StudentWorkExperiencePage {

  public student: StudentModel;
  public isSetup = false;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.student = navParams.get("student");

    // Determine if in setup or not
    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
  }

  /*
    TODO: Implement
    Save the work experience changes to the model and DB.
    If during setup, proceed to the next step, otherwise return to the student tabs page.
  */
  saveChanges() {
    if (this.isSetup) {
      this.navCtrl.push(StudentTabsPage, {student: this.student});
    }
    else {
      this.navCtrl.setRoot(StudentTabsPage, { message: "Work experience updated successfully" });
    }
  }

  /*
    Only available in setup.
    Skip this step and proceed to the next.
  */
  skipClicked() {
    this.navCtrl.push(StudentTabsPage, {student: this.student, setup: true});
  }

  /*
    Navigate back to the previous screen.
  */
  backBtn() {
    this.navCtrl.pop();
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
}
