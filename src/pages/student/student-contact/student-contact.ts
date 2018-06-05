import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  StudentTabsPage,
  StudentJobPreferencesPage
} from '@app/pages/student';

import {
  StudentContactModel,
  StudentModel
} from '@app/models';

import { StudentService } from '@app/services';

//=========================================================================
// * StudentContactPage                                                   
//=========================================================================
// - Page to update student contact information such as phone number,
//   contact email, etc.
//_________________________________________________________________________
@Component({
  selector: 'page-student-contact',
  templateUrl: 'student-contact.html'
})
export class StudentContactPage {

  public student: StudentModel;
  public model = new StudentContactModel();
  public isSetup = false;

  // ngForm object for validation control
  @ViewChild('contactForm') contactForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private studentService: StudentService
  ) {
    this.student = navParams.get("student");

    // Determine if coming from setup process or not
    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
    else {
      this.model.contactEmail = this.student.contactEmail;
      this.model.phoneNumber = this.student.phoneNumber;
      this.model.website = this.student.website;
    }
  }

  /*
    Update the student's contact info on the model and in the DB.
    If called during setup, proceed to the next step, otherwise return
    to student tabs page.
  */
  saveChanges() {
    if (this.contactForm && this.contactForm.valid) {
      this.student.updateContact(this.model);
      this.studentService.updateStudent(this.student).subscribe(
        data => {},
        res => {
          if (res.status == 200) {
            if (this.isSetup) {
              this.navCtrl.push(StudentJobPreferencesPage, { student: this.student, setup: true });
            }
            else {
              this.navCtrl.setRoot(StudentTabsPage, { message: "Contact Information updated successfully" });
            }
          }
          else {
            this.presentToast("There was an error updating your contact information, please try again");
          }
        }
      );
    }
    else {
      this.presentToast("Please enter a contact email and a phone number. Website is optional");
    }
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
