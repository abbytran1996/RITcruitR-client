import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentContactPage } from '../student-contact/student-contact';

import { EducationDetailsModel } from '../../models/education-details.model';
import { StudentModel } from '../../models/student.model';

import { StudentService } from '../../app/services/student.service';

@Component({
  selector: 'page-student-education',
  templateUrl: 'student-education.html'
})
export class StudentEducationPage {

  public student: StudentModel;
  public isSetup = false;
  public maxYear = undefined;

  // ngForm object for validation control
  @ViewChild('educationForm') educationForm;

  // Form model for education fields
  model = new EducationDetailsModel("", "", "", "");

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, private studentService: StudentService) {
    this.maxYear = (new Date()).getFullYear() + 20;

    this.student = navParams.get("student");

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
    else {
      // TODO: Add call or use incoming data to set the model to the existing education details.
      this.model.school = "Rochester Institute of Technology";
      this.model.major = "Software Engineering";
      this.model.gpa = "3.6";
      this.model.graduationDate = "2018-12-01";
    }
  }

  continueClicked() {
    if (this.educationForm && this.educationForm.valid) {
      this.student.updateEducation(this.model);
      this.studentService.updateStudent(this.student).subscribe(
        data => {},
        res => {
          if (res.status == 200) {
              this.navCtrl.push(StudentContactPage, {student: this.student, setup: true});
          }
          else {
            this.presentToast("There was an error updating your education details, please try again");
          }
        }
      );
    }
    else {
      this.presentToast("Please enter your university name, major, GPA, and expected graduation date");
    }
  }

  saveClicked() {
    if (this.educationForm && this.educationForm.valid) {
      // TODO: Call API to update education details
      this.navCtrl.setRoot(TabsPage, {message: "Education details updated successfully"});
    }
    else {
      this.presentToast("Please enter your university name, major, GPA, and expected graduation date");
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
