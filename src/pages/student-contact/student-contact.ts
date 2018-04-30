import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { StudentTabsPage } from '../student-tabs/student-tabs';
import { StudentJobPreferencesPage } from '../student-job-preferences/student-job-preferences';

import { StudentContactModel } from '../../models/student-contact.model';
import { StudentModel } from '../../models/student.model';

import { StudentService } from '../../app/services/student.service';

@Component({
  selector: 'page-student-contact',
  templateUrl: 'student-contact.html'
})
export class StudentContactPage {

  public student: StudentModel;
  public isSetup = false;

  // ngForm object for validation control
  @ViewChild('contactForm') contactForm;

  // Form models
  model = new StudentContactModel("", "", "");

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private studentService: StudentService
  ) {
    this.student = navParams.get("student");

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
    else {
      this.model.contactEmail = this.student.contactEmail;
      this.model.phoneNumber = this.student.phoneNumber;
      this.model.website = this.student.website;
    }
  }

  continueClicked() {
    if (this.contactForm && this.contactForm.valid) {
      this.student.updateContact(this.model);
      this.studentService.updateStudent(this.student).subscribe(
        data => {},
        res => {
          if (res.status == 200) {
              this.navCtrl.push(StudentJobPreferencesPage, {student: this.student, setup: true});
          }
          else {
            this.presentToast("There was an error updating your education details, please try again");
          }
        }
      );
    }
    else {
      this.presentToast("Please enter a contact email and a phone number. Website is optional");
    }
  }

  saveClicked() {
    if (this.contactForm && this.contactForm.valid) {
      this.student.updateContact(this.model);
      this.studentService.updateStudent(this.student).subscribe(
        data => {},
        res => {
          if (res.status == 200) {
              this.navCtrl.setRoot(StudentTabsPage, {message: "Contact Information updated successfully"});
          }
          else {
            this.presentToast("There was an error updating your education details, please try again");
          }
        }
      );
    }
    else {
      this.presentToast("Please enter a contact email and a phone number. Website is optional");
    }
  }

  // Navigate back to the previous screen
  backBtn() {
    this.navCtrl.pop();
  }

  // Present a toast message to the user
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
