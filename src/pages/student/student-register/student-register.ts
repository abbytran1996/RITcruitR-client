import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { StudentSetupPage } from '@app/pages/student';

import { 
  StudentRegisterModel,
  StudentModel
} from '@app/models';

import {
  AuthService,
  StudentService,
  HelperService
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
  public loading = false;

  // ngForm object for validation control
  @ViewChild('registerForm') registerForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private studentService: StudentService,
    private authService: AuthService,
    private helperService: HelperService
  ) {}

  /*
    Attempt to register a new student with the system.
    If successful, proceed to the student setup pages.
  */
  register() {
    this.loading = true;
    if (this.registerForm && this.registerForm.valid) {

      // Password validation
      let pwdVal = this.helperService.validatePassword(this.model.password);
      if (pwdVal != true) {
        this.presentToast(pwdVal);
        this.loading = false;
        return;
      }

      this.model.passwordConfirm = this.model.password;
      this.studentService.addStudent(this.model).subscribe(
        data => {
          let student = new StudentModel(data);
          this.authService.setLocalVars(data.user);
          this.loading = false;
          this.navCtrl.push(StudentSetupPage, {student: student});
        },
        error => {
          this.presentToast("A user with that email already exists, please choose another");
          this.loading = false;
        }
      );
    }
    else {
      this.presentToast("Please enter a valid email, password, first name, and last name");
      this.loading = false;
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
