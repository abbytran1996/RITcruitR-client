import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  StudentTabsPage,
  StudentContactPage
} from '@app/pages/student';

import {
  StudentEducationModel,
  StudentModel
} from '@app/models';

import { StudentService } from '@app/services';

//=========================================================================
// * StudentEducationPage                                                   
//=========================================================================
// - Page to update student education information such as university,
//   major, etc.
//_________________________________________________________________________
@Component({
  selector: 'page-student-education',
  templateUrl: 'student-education.html'
})
export class StudentEducationPage {

  public student: StudentModel;
  public model = new StudentEducationModel();
  public isSetup = false;
  public maxYear = undefined;

  // ngForm object for validation control
  @ViewChild('educationForm') educationForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private studentService: StudentService
  ) {
    this.maxYear = (new Date()).getFullYear() + 20;
    this.student = navParams.get("student");

    // Determine if in setup process or not
    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
    else {
      this.model.school = this.student.school;
      this.model.major = this.student.major;
      this.model.gpa = this.student.gpa;
      this.model.graduationDate = this.student.graduationDate.substring(0, 7);
    }
  }

  /*
    Update the student education details on the model and in the DB.
    If during setup, proceed to the next setup step, otherwise return
    to the student tabs page.
  */
  saveChanges() {
    if (this.educationForm && this.educationForm.valid) {
      this.student.updateEducation(this.model);
      this.studentService.updateStudent(this.student).subscribe(
        data => {},
        res => {
          if (res.status == 200) {
            if (this.isSetup) {
              this.navCtrl.push(StudentContactPage, { student: this.student, setup: true });
            }
            else {
              this.navCtrl.setRoot(StudentTabsPage, { message: "Education details updated successfully" });
            }
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

  /*
    Navigate back to the previous screen
  */
  backBtn() {
    this.navCtrl.pop();
  }

  /*
    Present a toast message to the user
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
