import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentSetupPage } from '../student-setup/student-setup';

import { StudentRegisterModel } from '../../models/student-register.model';
import { StudentModel } from '../../models/student.model';

import { AuthService } from '../../app/services/auth.service';
import { StudentService } from '../../app/services/student.service';

@Component({
  selector: 'page-student-register',
  templateUrl: 'student-register.html'
})
export class StudentRegisterPage {

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;

  // Form model for register fields
  model = new StudentRegisterModel("", "", "", "", "");

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private studentService: StudentService, private authService: AuthService) {

  }

  // Attempt to register the student
  register() {
    if (this.registerForm && this.registerForm.valid) {
      // Make API call to register the student
      this.model.passwordConfirm = this.model.password;
      this.studentService.addStudent(this.model).subscribe(
        data => {
          let student = StudentModel.createStudentFromApiData(data);
          this.authService.setLocalVars(data.user);
          this.navCtrl.push(StudentSetupPage, {student: student});
        },
        error => {
          this.presentToast("A user with that email already exists, please choose another");
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
      position: 'top',
      showCloseButton: true,
      closeButtonText: ''
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
