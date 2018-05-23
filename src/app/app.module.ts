// Base angular and ionic imports
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
import { SelectSearchableModule } from 'pages/modals/ionic-select-searchable';

// General Module
import {
  LoginPage,
  RegisterPage
} from '@app/pages/general';

// Student Module
import { 
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
  StudentProfileDetailsPage
} from '@app/pages/student';

// Company Module
import {
  CompanyTabsPage,
  CompanyRegister1Page,
  CompanyRegister2Page,
  CompanyRegisterConfirmPage,
  CompanySetupPage,
  CompanyPhase1Page,
  CompanyPhase2Page,
  CompanyPhase3Page,
  CompanyDetailsPage,
  RecruiterCompanySelectPage,
  RecruiterRegisterPage,
  RecruiterContactPage,
  CompanyJobCreate1Page,
  CompanyJobCreate2Page,
  CompanyJobCreate3Page,
  CompanyJobCreate4Page,
  CompanyJobCreate5Page,
  CompanyJobCreate6Page,
  CompanyJobCreate7Page,
  CompanyJobCreate8Page
} from '@app/pages/company';

// Modals
import {
  PresentationLinkAddModal,
  ProblemStatementAddModal
} from '../pages/modals';

// Services
import {
  ApiService,
  AuthService,
  CompanyService,
  JobPostingService,
  RecruiterService,
  StudentService,
  DataService
} from '@app/services';

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
