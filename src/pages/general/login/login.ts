import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, IonicPage, AlertController } from 'ionic-angular';

import {
  StudentTabsPage,
  StudentDetailFormsPage
} from '@app/pages/student';

import {
  CompanyTabsPage,
  CompanyRegisterConfirmPage
} from '@app/pages/company';

import { RegisterPage } from '@app/pages/general';
import { AdminDashboardPage } from '@app/pages/admin';

import {
  LoginModel,
  StudentModel,
  RecruiterModel,
  CompanyModel
} from '@app/models';

import {
  AuthService,
  StudentService,
  RecruiterService,
  DataService
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

  public isApp = true;
  public model = new LoginModel();
  public loadingLogin = false;
  private loginMode = 0; // TODO: Remove, only used in dev

  // ngForm object for validation control
  @ViewChild('loginForm') loginForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private studentService: StudentService,
    private recruiterService: RecruiterService,
    private dataService: DataService
  ) {
    this.isApp = dataService.isApp;
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
        this.loginMode++;
        break;

      case 1:
        this.model.username = "recruiter@facebook.com";
        this.model.password = "Recruiter1!";
        this.loginMode++;
        break;

      case 2:
        this.model.username = "admin@rit.edu";
        this.model.password = "AdminPassword1!";
        this.loginMode++;
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

      /*
        Attempt initial user authentication.
        =================================================================
      */
      this.authService.login(this.model).subscribe(
        data => {

          // Set needed user data and load the correct tabs page based on user role
          this.authService.setLocalVars(data);
          let userRole = this.authService.getUserRole(data);
          let userEmail = data.username;

          /*
            User is a student.
            --------------------------------------------------------------
          */
          if (userRole == AuthService.STUDENT) {
            if (!this.dataService.isApp) {
              this.presentToast("Student's can only login using the RecruitR mobile app");
              this.loadingLogin = false;
              return;
            }

            this.studentService.getStudentByEmail(userEmail).subscribe(
              data => {
                let student = new StudentModel(data);
                
                if (student.isSetup) {
                  this.loadingLogin = false;
                  this.navCtrl.push(StudentTabsPage, { student: student }, { animation: "md-transition" });
                }
                else {
                  this.loadingLogin = false;
                  this.navCtrl.push(StudentDetailFormsPage, { student: student, setup: true }, { animation: "md-transition" });
                }
              },
              error => {
                this.presentToast("An error occurred loading your account, please try again later");
                this.loadingLogin = false;
              }
            );
          }

          /*
            User is a recruiter.
            --------------------------------------------------------------
          */
          else if (userRole == AuthService.RECRUITER || userRole == AuthService.PRIMARY_RECRUITER) {
            if (!this.dataService.isApp) {
              this.presentToast("Recruiter's can only login using the RecruitR mobile app");
              this.loadingLogin = false;
              return;
            }

            this.recruiterService.getRecruiterByEmail(userEmail).subscribe(
              data => {
                let recruiter = new RecruiterModel(data);
                recruiter.primary = (userRole == AuthService.PRIMARY_RECRUITER);
                
                // If the company hasn't yet been approved or denied
                if (recruiter.company.status == null || recruiter.company.status == CompanyModel.STATUS_OPTIONS.AWAITING_APPROVAL) {
                  this.loadingLogin = false;
                  this.navCtrl.push(CompanyRegisterConfirmPage, { fromLogin: true }, { animation: "md-transition" });
                }

                // If the company has been denied
                else if (recruiter.company.status == CompanyModel.STATUS_OPTIONS.DENIED) {
                  this.loadingLogin = false;
                  this.showAlert("Company Denied", "We're sorry, but your company has been denied acces to RecruitR. This is potentially because an administrator detected faulty information in your registration. Please contact RecruitR with any concerns.");
                }

                // If the company has been approved
                else if (recruiter.company.status == CompanyModel.STATUS_OPTIONS.APPROVED) {
                  this.loadingLogin = false;
                  this.navCtrl.push(CompanyTabsPage, { recruiter: recruiter }, { animation: "md-transition" });
                }
              },
              error => {
                this.presentToast("An error occurred loading your account, please try again later");
                this.loadingLogin = false;
              }
            );
          }

          /*
            User is an admin.
            --------------------------------------------------------------
          */
          else if (userRole == AuthService.ADMIN) {
            if (this.dataService.isApp) {
              this.presentToast("Administrators's cannot login through the RecruitR mobile app. Please use a desktop web browser");
              this.loadingLogin = false;
              return;
            }

            this.loadingLogin = false;
            this.navCtrl.setRoot(AdminDashboardPage, { user: data }, { animation: "md-transition" });
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
    if (this.isApp) {
      this.navCtrl.push(RegisterPage);
    }
    else {
      this.presentToast("Please use the RecruitR mobile app to register as a new user");
    }
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

  /*
    Show an alert dialog with the given title and message.
  */
  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
