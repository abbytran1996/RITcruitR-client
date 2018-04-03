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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectSearchableModule } from 'ionic-select-searchable';

// Custom modules
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';

import { StudentRegisterPage } from '../pages/student-register/student-register';
import { StudentSetupPage } from '../pages/student-setup/student-setup';
import { StudentEducationPage } from '../pages/student-education/student-education';
import { StudentPhase1Page } from '../pages/student-home/student-phase-1';
import { StudentPhase2Page } from '../pages/student-home/student-phase-2';
import { StudentPhase3Page } from '../pages/student-home/student-phase-3';
import { StudentProfileDetailsPage } from '../pages/student-profile-details/student-profile-details';

import { CompanyRegister1Page } from '../pages/company-register/company-register-1';
import { CompanyRegister2Page } from '../pages/company-register/company-register-2';
import { CompanySetupPage } from '../pages/company-setup/company-setup';
import { CompanyJobCreate1Page } from '../pages/company-job-create/company-job-create-1';
import { CompanyJobCreate2Page } from '../pages/company-job-create/company-job-create-2';
import { CompanyJobCreate3Page } from '../pages/company-job-create/company-job-create-3';
import { CompanyJobCreate4Page } from '../pages/company-job-create/company-job-create-4';
import { CompanyJobCreate5Page } from '../pages/company-job-create/company-job-create-5';
import { CompanyJobCreate6Page } from '../pages/company-job-create/company-job-create-6';
import { CompanyJobCreate7Page } from '../pages/company-job-create/company-job-create-7';
import { CompanyJobCreate8Page } from '../pages/company-job-create/company-job-create-8';
import { CompanyDetailsPage } from '../pages/company-details/company-details';

import { RecruiterCompanySelectPage } from '../pages/recruiter-company-select/recruiter-company-select';
import { RecruiterRegisterPage } from '../pages/recruiter-register/recruiter-register';

import { LocationsSearchModal } from '../modals/locations-search/locations-search';

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
    StudentPhase1Page,
    StudentPhase2Page,
    StudentPhase3Page,
    StudentProfileDetailsPage,
    CompanyRegister1Page,
    CompanyRegister2Page,
    CompanySetupPage,
    CompanyJobCreate1Page,
    CompanyJobCreate2Page,
    CompanyJobCreate3Page,
    CompanyJobCreate4Page,
    CompanyJobCreate5Page,
    CompanyJobCreate5Page,
    CompanyJobCreate6Page,
    CompanyJobCreate7Page,
    CompanyJobCreate8Page,
    CompanyDetailsPage,
    RecruiterCompanySelectPage,
    RecruiterRegisterPage,
    TabsPage,
    LocationsSearchModal
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    SelectSearchableModule,
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
    StudentPhase1Page,
    StudentPhase2Page,
    StudentPhase3Page,
    StudentProfileDetailsPage,
    CompanyRegister1Page,
    CompanyRegister2Page,
    CompanySetupPage,
    CompanyJobCreate1Page,
    CompanyJobCreate2Page,
    CompanyJobCreate3Page,
    CompanyJobCreate4Page,
    CompanyJobCreate5Page,
    CompanyJobCreate5Page,
    CompanyJobCreate6Page,
    CompanyJobCreate7Page,
    CompanyJobCreate8Page,
    CompanyDetailsPage,
    RecruiterCompanySelectPage,
    RecruiterRegisterPage,
    TabsPage,
    LocationsSearchModal
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
