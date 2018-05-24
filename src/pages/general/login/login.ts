import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { StudentTabsPage } from '@app/pages/student';
import { CompanyTabsPage } from '@app/pages/company';
import { RegisterPage } from '@app/pages/general';

import {
  LoginModel,
  StudentModel,
  RecruiterModel
} from '@app/models';

import {
  AuthService,
  StudentService,
  RecruiterService
} from '@app/services';

//=========================================================================
// * LoginPage                                                   
//=========================================================================
// - Initial app login page. Users will login here with username and
//   password, when authenticated, the correct model (Student or Company)
//   will be retrieved based on the user's role. Then the corresponding
//   tabs page will be loaded.
//_________________________________________________________________________
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public model = new LoginModel();
  public loadingLogin = false;
  private loginMode = 0; // TODO: Remove, only used in dev

  // ngForm object for validation control
  @ViewChild('loginForm') loginForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private studentService: StudentService,
    private recruiterService: RecruiterService
  ) {
  }

  /*
    Used for quick login in development.
    TODO: Remove this, and the (click) directive in the template.
  */
  devLogin() {
    switch (this.loginMode) {
      case 0:
        this.model.username = "student@rit.edu";
        this.model.password = "Student1!";
        this.loginMode = 1;
        break;

      case 1:
        this.model.username = "recruiter@facebook.com";
        this.model.password = "Recruiter1!";
        this.loginMode = 2;
        break;
    
      default:
        this.model.username = "";
        this.model.password = "";
        this.loginMode = 0;
        break;
    }
  }

  /*
    Called when login button is clicked, attempt to authenticate user.
    Then retrieve the correct data model and send to the corresponding tabs page.
  */
  login() {
    if (this.loginForm && this.loginForm.valid) {
      this.loadingLogin = true;

      // Make API call to login and attempt authentication
      this.authService.login(this.model).subscribe(
        data => {

          // Set needed user data and load the correct tabs page based on user role
          this.authService.setLocalVars(data);
          let userRole = this.authService.getUserRole(data);
          let userEmail = data.username;

          if (userRole == 0) {
            this.studentService.getStudentByEmail(userEmail).subscribe(
              data => {
                let student = new StudentModel(data);
                this.loadingLogin = false;
                this.navCtrl.push(StudentTabsPage, {student: student}, { animation: "md-transition" });
              },
              error => {
                this.presentToast("An error occurred loading your account, please try again later");
                this.loadingLogin = false;
              }
            );
          }
          else {
            this.recruiterService.getRecruiterByEmail(userEmail).subscribe(
              data => {
                let recruiter = new RecruiterModel(data);
                this.loadingLogin = false;
                this.navCtrl.push(CompanyTabsPage, {recruiter: recruiter}, { animation: "md-transition" });
              },
              error => {
                this.presentToast("An error occurred loading your account, please try again later");
                this.loadingLogin = false;
              }
            );
          }
        },
        error => {
          this.presentToast("No user found with that email and password combination");
          this.loadingLogin = false;
        }
      );
    }
    else {
      this.presentToast("Please enter a valid email and password");
    }
  }

  /*
    Called when the register button is clicked, navigate to register screen.
  */
  register() {
    this.navCtrl.push(RegisterPage);
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
