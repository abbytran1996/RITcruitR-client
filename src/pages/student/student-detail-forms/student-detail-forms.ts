import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import {
  StudentTabsPage
} from '@app/pages/student';

import {
  StudentModel,
  StudentEducationModel,
  StudentContactModel,
  StudentJobPreferencesModel
} from '@app/models';

import {
  FormSequenceService,
  StudentService,
  DataService
} from '@app/services';

//=========================================================================
// * StudentDetailForms                                                   
//=========================================================================
// - Page containing the form sequence for all student profile details.
// - This includes: education, contact, job preferences, skills,
//   work experience.
//_________________________________________________________________________
@Component({
  selector: 'page-student-detail-forms',
  templateUrl: 'student-detail-forms.html'
})
export class StudentDetailFormsPage {

  // Step 0 variables
  @ViewChild('form0') form0;
  public maxYear = undefined;
  public educationModel = new StudentEducationModel();

  // Step 1 variables
  @ViewChild('form1') form1;
  public contactModel = new StudentContactModel();

  // Step 2 variables
  @ViewChild('form2') form2;
  public prefsModel = new StudentJobPreferencesModel();
  public locationOptions = [];
  public industryOptions = [];
  public companySizeOptions = [];

  // Step 3 variables
  @ViewChild('form3') form3;
  public skills = [];
  public skillOptions = [];

  // Implementation specific variables
  public student: StudentModel;
  public isSetup = false;
  public saving = false;
  public loading = true;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public formSeq: FormSequenceService,
    private studentService: StudentService,
    private dataService: DataService
  ) {
    this.formSeq.reset();
    this.formSeq.startStep = navParams.get("startStep") || 0;
    this.formSeq.currentStep = this.formSeq.startStep;
    this.formSeq.formTitles = [
      "Education Details",
      "Contact Information",
      "Job Preferences",
      "Skills"
    ];
    this.formSeq.formErrorMessages = [
      "Please enter your university name, major, GPA, and expected graduation date",
      "Please enter a contact email and a phone number",
      "Please select at least one option for preferred company sizes",
      "There was an error saving your skills"
    ];

    this.student = navParams.get("student") || new StudentModel();

    // Step 0
    this.maxYear = (new Date()).getFullYear() + 20;

    // Step 2
    this.locationOptions = this.dataService.getLocations();
    this.industryOptions = this.dataService.getIndustries();
    this.companySizeOptions = this.dataService.getCompanySizesForStudent();

    // Step 3
    // Get skills from the DB to populate the typeahead
    this.dataService.getSkills().subscribe(
      data => {
        this.skillOptions = data;

        // Transfer student skills to skills array (needed to get searchable modal to reflect the proper values)
        this.skills = [];
        this.student.skills.forEach(skill => {
          let skillIndex = this.skillOptions.findIndex(skillOption => skillOption.id == skill.id);
          if (skillIndex && skillIndex > -1) {
            this.skills.push(this.skillOptions[skillIndex]);
          }
        });
      },
      error => {
        this.presentToast("There was an error retrieving the list of skills, please try again");
      }
    );

    // Determine if in setup process or not
    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
    else {
      this.educationModel.school = this.student.school;
      this.educationModel.major = this.student.major;
      this.educationModel.gpa = this.student.gpa;
      this.educationModel.graduationDate = this.student.graduationDate.substring(0, 7);

      this.contactModel.contactEmail = this.student.contactEmail;
      this.contactModel.phoneNumber = this.student.phoneNumber;
      this.contactModel.website = this.student.website;

      this.prefsModel.preferredLocations = this.student.preferredLocations;
      this.prefsModel.preferredIndustries = this.student.preferredIndustries;
      this.prefsModel.preferredCompanySizes = this.student.preferredCompanySizes;
    }
  }

  /*
    Prepare the first step upon entering the page.
  */
  ionViewDidEnter() {
    let formsArray = [
      this.form0,
      this.form1,
      this.form2,
      this.form3
    ];

    this.formSeq.init(formsArray);
    this.loading = false;
  }

  /*
    Continue to the next step of student setup. Update any info as needed.
  */
  continueClicked() {
    if (this.formSeq.switchingStep) return;

    if (this.formSeq.currentForm && this.formSeq.currentForm.valid) {
      // Save education details after step 0
      if (this.formSeq.currentStep == 0) {
        this.saving = true;
        this.student.updateEducation(this.educationModel);
        this.studentService.updateStudent(this.student).subscribe(
          data => { },
          res => {
            if (res.status == 200) {
              if (this.isSetup) {
                this.saving = false;
                this.formSeq.nextStep();
              }
              else {
                this.saving = false;
                this.navCtrl.setRoot(StudentTabsPage, { message: "Education details updated successfully" });
              }
            }
            else {
              this.presentToast("There was an error updating your education details, please try again");
              this.saving = false;
            }
          }
        );
      }

      // Save contact information after step 1
      else if (this.formSeq.currentStep == 1) {
        this.saving = true;
        this.student.updateContact(this.contactModel);
        this.studentService.updateStudent(this.student).subscribe(
          data => { },
          res => {
            if (res.status == 200) {
              if (this.isSetup) {
                this.saving = false;
                this.formSeq.nextStep();
              }
              else {
                this.saving = false;
                this.navCtrl.setRoot(StudentTabsPage, { message: "Contact Information updated successfully" });
              }
            }
            else {
              this.presentToast("There was an error updating your contact information, please try again");
              this.saving = false;
            }
          }
        );
      }

      // Save job preferences after step 2
      else if (this.formSeq.currentStep == 2) {
        this.saving = true;
        this.student.updateMatchPreferences(this.prefsModel);
        this.studentService.updateStudent(this.student).subscribe(
          data => { },
          res => {
            if (res.status == 200) {
              if (this.isSetup) {
                this.saving = false;
                this.formSeq.nextStep();
              }
              else {
                this.saving = false;
                this.navCtrl.setRoot(StudentTabsPage, { message: "Job Preferences updated successfully" });
              }
            }
            else {
              this.presentToast("There was an error updating your job preferences, please try again");
              this.saving = false;
            }
          }
        );
      }

      // Save student skills after step 3
      // Last step
      else if (this.formSeq.currentStep == 3) {
        this.saving = true;
        this.student.skills = this.skills;
        this.studentService.updateStudentSkills(this.student.id, this.student.skills).subscribe(
          data => {
            if (this.isSetup) {
              this.saving = false;
              this.navCtrl.push(StudentTabsPage, { student: this.student });
            }
            else {
              this.saving = false;
              this.navCtrl.setRoot(StudentTabsPage, { message: "Skills updated successfully" });
            }
          },
          res => {
            this.presentToast("There was an error updating your skills, please try again");
            this.saving = false;
          }
        );
      }

      // Generic step with no saving, go to next step
      else {
        this.formSeq.nextStep();
        this.saving = false;
      }
    }
    else {
      this.presentToast(this.formSeq.formErrorMessages[this.formSeq.currentStep]);
      this.saving = false;
    }
  }

  /*
    Navigate back to the previous step/screen.
  */
  backBtn() {
    if (this.formSeq.switchingStep) return;
    if (this.saving) return;

    if (!this.isSetup) {
      this.navCtrl.pop();
      return;
    }

    if (this.formSeq.currentStep == this.formSeq.startStep) {
      this.navCtrl.pop();
    }
    else {
      this.formSeq.previousStep();
    }
  }

  /*
    Removes the given array of skills from the skill options array.
    Used to limit the selectable options in certain cases.
  */
  removeSkillOptions(toRemove) {
    let values = toRemove;

    values.forEach(value => {
      let skillIndex = this.skillOptions.findIndex(skill => skill.id == value.id);
      if (skillIndex && skillIndex > -1) {
        this.skillOptions.splice(skillIndex, 1);
      }
    });
  }

  /*
    Remove the skill at the given index from the list of the student's skills.
    Doesn't update in the DB at this point, just makes the "unsaved" change locally.
  */
  removeSkill(index) {
    this.skills.splice(index, 1);
  }

  /*
    Present a toast message to the user
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
