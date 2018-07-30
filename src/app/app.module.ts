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
import { CallNumber } from '@ionic-native/call-number';
import { MyApp } from './app.component';

// Third party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectSearchableModule } from 'pages/modals/ionic-select-searchable';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MomentModule } from 'ngx-moment';

// General Module
import {
  LoginPageModule,
  LoginPage,
  RegisterPage
} from '@app/pages/general';

// Student Module
import {
  StudentTabsPage,
  StudentRegisterPage,
  StudentSetupPage,
  StudentDetailFormsPage,
  StudentPhase1Page,
  StudentPhase2Page,
  StudentPhase3Page,
  StudentProfileDetailsPage,
  StudentPresentationLinksPage,
  StudentProblemStatementsPage
} from '@app/pages/student';

// Company Module
import {
  CompanyTabsPage,
  CompanyRecruiterRegisterPage,
  CompanyRegisterConfirmPage,
  CompanySetupPage,
  CompanyJobMatchesPage,
  CompanyPhase1Page,
  CompanyPhase2Page,
  CompanyPhase3Page,
  CompanyDetailsPage,
  RecruiterCompanySelectPage,
  CompanyJobCreatePage,
  CompanyPresentationLinksPage
} from '@app/pages/company';

// Admin Module
import {
  AdminDashboardPageModule,
  AdminDashboardPage,
  AdminCompanyValidationPage
} from '@app/pages/admin';

// Modals
import {
  PresentationLinkAddModal,
  ProblemStatementAddModal,
  JobLocationsPreferenceModal,
  JobIndustriesPreferenceModal,
  CompanySizePreferenceModal
} from '@app/pages/modals';

// Services
import {
  ApiService,
  AuthService,
  CompanyService,
  JobPostingService,
  RecruiterService,
  StudentService,
  DataService,
  FormSequenceService,
  HelperService
} from '@app/services';

// Pipes
import {
  PhonePipe
} from '@app/pipes';

@NgModule({

  /*
    =========================================== DECLARATIONS
  */
  declarations: [
    MyApp,
    RegisterPage,

    StudentTabsPage,
    StudentRegisterPage,
    StudentSetupPage,
    StudentDetailFormsPage,
    StudentPhase1Page,
    StudentPhase2Page,
    StudentPhase3Page,
    StudentProfileDetailsPage,
    StudentPresentationLinksPage,
    StudentProblemStatementsPage,

    CompanyTabsPage,
    CompanyRecruiterRegisterPage,
    CompanyRegisterConfirmPage,
    CompanySetupPage,
    CompanyJobCreatePage,
    CompanyJobMatchesPage,
    CompanyPhase1Page,
    CompanyPhase2Page,
    CompanyPhase3Page,
    CompanyDetailsPage,
    RecruiterCompanySelectPage,
    CompanyPresentationLinksPage,

    AdminCompanyValidationPage,

    PresentationLinkAddModal,
    ProblemStatementAddModal,
    JobLocationsPreferenceModal,
    JobIndustriesPreferenceModal,
    CompanySizePreferenceModal,

    PhonePipe
  ],

  /*
    =========================================== IMPORTS
  */
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MomentModule,
    SelectSearchableModule,
    LoginPageModule,
    AdminDashboardPageModule,
    IonicModule.forRoot(MyApp, {
      locationStrategy: "path"
    }),
    HttpClientModule,
    HttpModule,
    FormsModule
  ],

  /*
    =========================================== BOOTSTRAP
  */
  bootstrap: [IonicApp],

  /*
    =========================================== ENTRY COMPONENTS
  */
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,

    StudentTabsPage,
    StudentRegisterPage,
    StudentSetupPage,
    StudentDetailFormsPage,
    StudentPhase1Page,
    StudentPhase2Page,
    StudentPhase3Page,
    StudentProfileDetailsPage,
    StudentPresentationLinksPage,
    StudentProblemStatementsPage,

    CompanyTabsPage,
    CompanyRecruiterRegisterPage,
    CompanyRegisterConfirmPage,
    CompanySetupPage,
    CompanyJobCreatePage,
    CompanyJobMatchesPage,
    CompanyPhase1Page,
    CompanyPhase2Page,
    CompanyPhase3Page,
    CompanyDetailsPage,
    RecruiterCompanySelectPage,
    CompanyPresentationLinksPage,

    AdminDashboardPage,
    AdminCompanyValidationPage,

    PresentationLinkAddModal,
    ProblemStatementAddModal,
    JobLocationsPreferenceModal,
    JobIndustriesPreferenceModal,
    CompanySizePreferenceModal
  ],

  /*
    =========================================== PROVIDERS
  */
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule,

    ApiService,
    AuthService,
    CompanyService,
    JobPostingService,
    RecruiterService,
    StudentService,
    DataService,
    FormSequenceService,
    HelperService
  ]
})
export class AppModule {}
