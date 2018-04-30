import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MyApp } from './app.component';

// Third party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectSearchableModule } from '../modals/ionic-select-searchable';

// Custom Modules
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { StudentTabsPage } from '../pages/student-tabs/student-tabs';
import { StudentRegisterPage } from '../pages/student-register/student-register';
import { StudentSetupPage } from '../pages/student-setup/student-setup';
import { StudentEducationPage } from '../pages/student-education/student-education';
import { StudentContactPage } from '../pages/student-contact/student-contact';
import { StudentJobPreferencesPage } from '../pages/student-job-preferences/student-job-preferences';
import { StudentSkillsPage } from '../pages/student-skills/student-skills';
import { StudentWorkExperiencePage } from '../pages/student-work-experience/student-work-experience';
import { StudentPhase1Page } from '../pages/student-home/student-phase-1';
import { StudentPhase2Page } from '../pages/student-home/student-phase-2';
import { StudentPhase3Page } from '../pages/student-home/student-phase-3';
import { StudentProfileDetailsPage } from '../pages/student-profile-details/student-profile-details';

import { CompanyTabsPage } from '../pages/company-tabs/company-tabs';
import { CompanyRegister1Page } from '../pages/company-register/company-register-1';
import { CompanyRegister2Page } from '../pages/company-register/company-register-2';
import { CompanyRegisterConfirmPage } from '../pages/company-register-confirm/company-register-confirm';
import { CompanySetupPage } from '../pages/company-setup/company-setup';
import { CompanyPhase1Page } from '../pages/company-home/company-phase-1';
import { CompanyPhase2Page } from '../pages/company-home/company-phase-2';
import { CompanyPhase3Page } from '../pages/company-home/company-phase-3';
import { CompanyDetailsPage } from '../pages/company-details/company-details';

import { RecruiterCompanySelectPage } from '../pages/recruiter-company-select/recruiter-company-select';
import { RecruiterRegisterPage } from '../pages/recruiter-register/recruiter-register';
import { RecruiterContactPage } from '../pages/recruiter-contact/recruiter-contact';

import { PresentationLinkAddModal } from '../modals/presentation-link-add/presentation-link-add';
import { ProblemStatementAddModal } from '../modals/problem-statement-add/problem-statement-add';

import {
  CompanyJobCreate1Page,
  CompanyJobCreate2Page,
  CompanyJobCreate3Page,
  CompanyJobCreate4Page,
  CompanyJobCreate5Page,
  CompanyJobCreate6Page,
  CompanyJobCreate7Page,
  CompanyJobCreate8Page,
} from '../pages/company-job-create';

import {
  ApiService,
  AuthService,
  CompanyService,
  JobPostingService,
  RecruiterService,
  StudentService,
  DataService
} from './services';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    StudentTabsPage,
    StudentRegisterPage,
    StudentSetupPage,
    StudentEducationPage,
    StudentContactPage,
    StudentJobPreferencesPage,
    StudentSkillsPage,
    StudentWorkExperiencePage,
    StudentPhase1Page,
    StudentPhase2Page,
    StudentPhase3Page,
    StudentProfileDetailsPage,
    CompanyTabsPage,
    CompanyRegister1Page,
    CompanyRegister2Page,
    CompanyRegisterConfirmPage,
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
    CompanyPhase1Page,
    CompanyPhase2Page,
    CompanyPhase3Page,
    CompanyDetailsPage,
    RecruiterCompanySelectPage,
    RecruiterRegisterPage,
    RecruiterContactPage,
    PresentationLinkAddModal,
    ProblemStatementAddModal
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
    StudentTabsPage,
    StudentRegisterPage,
    StudentSetupPage,
    StudentEducationPage,
    StudentContactPage,
    StudentJobPreferencesPage,
    StudentSkillsPage,
    StudentWorkExperiencePage,
    StudentPhase1Page,
    StudentPhase2Page,
    StudentPhase3Page,
    StudentProfileDetailsPage,
    CompanyTabsPage,
    CompanyRegister1Page,
    CompanyRegister2Page,
    CompanyRegisterConfirmPage,
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
    CompanyPhase1Page,
    CompanyPhase2Page,
    CompanyPhase3Page,
    CompanyDetailsPage,
    RecruiterCompanySelectPage,
    RecruiterRegisterPage,
    RecruiterContactPage,
    PresentationLinkAddModal,
    ProblemStatementAddModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule,
    ApiService,
    AuthService,
    CompanyService,
    JobPostingService,
    RecruiterService,
    StudentService,
    DataService
  ]
})
export class AppModule {}
