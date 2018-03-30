import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';

// Third party modules
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Custom modules
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { AccountPage } from '../pages/account/account';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { StudentRegisterPage } from '../pages/student-register/student-register';
import { StudentSetupPage } from '../pages/student-setup/student-setup';
import { StudentEducationPage } from '../pages/student-education/student-education';

import { RecruiterCompanySelectPage } from '../pages/recruiter-company-select/recruiter-company-select';
import { RecruiterRegisterPage } from '../pages/recruiter-register/recruiter-register';
import { RecruiterSetupPage } from '../pages/recruiter-setup/recruiter-setup';

import { CompanyRegister1Page } from '../pages/company-register/company-register-1';

import {
  ApiService,
  AuthService,
  RecruiterService,
  StudentService
} from './services';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    StudentRegisterPage,
    StudentSetupPage,
    StudentEducationPage,
    CompanyRegister1Page,
    RecruiterCompanySelectPage,
    RecruiterRegisterPage,
    RecruiterSetupPage,
    TabsPage,
    HomePage,
    AboutPage,
    AccountPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    StudentRegisterPage,
    StudentSetupPage,
    StudentEducationPage,
    CompanyRegister1Page,
    RecruiterCompanySelectPage,
    RecruiterRegisterPage,
    RecruiterSetupPage,
    TabsPage,
    HomePage,
    AboutPage,
    AccountPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule,
    ApiService,
    AuthService,
    RecruiterService,
    StudentService
  ]
})
export class AppModule {}
