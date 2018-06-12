import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { StudentSetupPage } from '@app/pages/student';

import { 
  StudentRegisterModel,
  StudentModel
} from '@app/models';

import {
  AuthService,
  StudentService
 } from '@app/services';

//=========================================================================
// * StudentRegisterPage                                                   
//=========================================================================
// - Page to register a new user as a student.
//_________________________________________________________________________
@Component({
  selector: 'page-student-register',
  templateUrl: 'student-register.html'
})
export class StudentRegisterPage {

  public model = new StudentRegisterModel();

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  /*
    Attempt to register a new student with the system.
    If successful, proceed to the student setup pages.
  */
  register() {
    if (this.registerForm && this.registerForm.valid) {
      this.model.passwordConfirm = this.model.password;
      this.studentService.addStudent(this.model).subscribe(
        data => {
          let student = new StudentModel(data);
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
