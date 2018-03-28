import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentSetupPage } from '../student-setup/student-setup';

import { StudentRegisterModel } from '../../models/student-register.model';

import { StudentService } from '../../app/services/student.service';

@Component({
  selector: 'page-student-register',
  templateUrl: 'student-register.html'
})
export class StudentRegisterPage {

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;

  // Form model for register fields
  model = new StudentRegisterModel("", "", "", "");

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private studentService: StudentService) {

  }

  // Attempt to register the student
  register() {
    if (this.registerForm && this.registerForm.valid) {
      // Make API call to register the student
      this.studentService.addStudent(addTempStudentFields(this.model)).subscribe(
        data => {
          window.localStorage.setItem('id', data.id);
          this.navCtrl.push(StudentSetupPage, {user: data});
        },
        error => {
          this.presentToast("Registration failed, please use a different email address");
        }
      );
    }
    else {
      this.presentToast("Please enter a valid email, password, first name, and last name");
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
      position: 'top'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}

function addTempStudentFields(student) {
  student["passwordConfirm"] = student.password;
  student["school"] = "RIT";
  student["graduationDate"] = "3918-06-01";
  student["phoneNumber"] = "7165978584";
  student["preferredStates"] = [];
  student["preferredCompanySize"] = 4;
  student["resume"] = null;
  return student;
}
