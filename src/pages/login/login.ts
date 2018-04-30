import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { StudentTabsPage } from '../student-tabs/student-tabs';
import { CompanyTabsPage } from '../company-tabs/company-tabs';
import { RegisterPage } from '../register/register';

import { LoginModel } from '../../models/login.model';

import { AuthService } from '../../app/services/auth.service';
import { StudentModel } from '../../models/student.model';
import { RecruiterModel } from '../../models/recruiter.model';

import { StudentService } from '../../app/services/student.service';
import { RecruiterService } from '../../app/services/recruiter.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  // ngForm object for validation control
  @ViewChild('loginForm') loginForm;

  // Form model for login fields
  model = new LoginModel("", "");

  public loadingLogin = false;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private studentService: StudentService,
    private recruiterService: RecruiterService
  ) {
    // TODO: Remove eventually, for now I'm leaving it here for simplicity with future dev
    this.model.username = "rh3547@rit.edu";
    this.model.password = "Student1!";
    // this.model.username = "recruiter@facebook.com";
    // this.model.password = "Recruiter1!";
  }

  // Called when login button is clicked, attempt to authenticate user
  login() {
    if (this.loginForm && this.loginForm.valid) {
      this.loadingLogin = true;

      // Make API call to login
      this.authService.login(this.model).subscribe(
        data => {

          // Set needed user data and load the correct tabs page based on user role
          this.authService.setLocalVars(data);
          let userRole = this.authService.getUserRole(data);
          let userEmail = data.username;

          if (userRole == 0) {
            this.studentService.getStudentByEmail(userEmail).subscribe(
              data => {
                let student = StudentModel.createStudentFromApiData(data);
                this.loadingLogin = false;
                this.navCtrl.push(StudentTabsPage, {student: student}, { animation: "md-transition" });
              },
              error => {
                this.presentToast("An error occurred loading your account, please try again later");
              }
            );
          }
          else {
            this.recruiterService.getRecruiterByEmail(userEmail).subscribe(
              data => {
                let recruiter = RecruiterModel.createRecruiterFromApiData(data);
                this.loadingLogin = false;
                this.navCtrl.push(CompanyTabsPage, {recruiter: recruiter}, { animation: "md-transition" });
              },
              error => {
                this.presentToast("An error occurred loading your account, please try again later");
              }
            );
          }
        },
        error => {
          this.presentToast("No user found with that email and password combination");
        }
      );
    }
    else {
      this.presentToast("Please enter a valid email and password");
    }
  }

  // Called when the register button is clicked, navigate to register screen
  register() {
    this.navCtrl.push(RegisterPage);
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
