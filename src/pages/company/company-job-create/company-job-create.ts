import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController, ModalController } from 'ionic-angular';

import {
  CompanyTabsPage
} from '@app/pages/company';

import { PresentationLinkAddModal } from '@app/pages/modals';

import {
  NewJobModel,
  RecruiterModel
} from '@app/models';

import {
  FormSequenceService,
  DataService,
  JobPostingService,
  HelperService
} from '@app/services';

//=========================================================================
// * CompanyJobCreatePage                                                   
//=========================================================================
// - Page for the job creation process. This contains all steps in one
//   components.
//_________________________________________________________________________
@Component({
  selector: 'page-company-job-create',
  templateUrl: 'company-job-create.html'
})
export class CompanyJobCreatePage {

  // Step 0 variables
  @ViewChild('form0') form0;
  locationOptions = [];

  // Step 1 variables
  @ViewChild('form1') form1;

  // Step 2 variables
  @ViewChild('form2') form2;
  reqSkillOptions = [];
  reqSkills = [];

  // Step 3 variables
  @ViewChild('form3') form3;
  nthSkillOptions = [];
  nthSkills = [];

  // Step 4 variables
  @ViewChild('form4') form4;

  // Step 5 variables
  @ViewChild('form5') form5;

  // Step 6 variables
  @ViewChild('form6') form6;

  // Step 7 variables
  @ViewChild('form7') form7;
  linksList = [];

  // Implementation specific variables
  public jobModel = new NewJobModel();
  public recruiter: RecruiterModel;
  public saving = false;
  public loading = false;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public formSeq: FormSequenceService,
    public jobPostingService: JobPostingService,
    public dataService: DataService,
    public helperService: HelperService
  ) {
    this.recruiter = navParams.get("recruiter");

    this.formSeq.reset();
    this.formSeq.startStep = navParams.get("startStep") || 0;
    this.formSeq.currentStep = this.formSeq.startStep;
    this.formSeq.formTitles = [
      "Job Basic Details",
      "Job Description",
      "Required Skills",
      "Nice to Have Skills",
      "Job Filters",
      "Job Expiration",
      "Problem Statement",
      "Presentation Links"
    ];
    this.formSeq.formErrorMessages = [
      "Please enter the job title and any job locations",
      "Please enter the job description",
      "Please select at least one required skill. Having no required skills will result in no matches",
      "There was a problem with the skills you have selected, please review them and try again",
      "There was a problem setting your job filters, please try again",
      "Please enter a valid job duration",
      "Please enter a job problem statement",
      "Please add at least one, and at most three presentation link(s) for applicants to view"
    ];

    // Get the skills to populate the typeahead
    this.dataService.getSkills().subscribe(
      data => {
        this.reqSkillOptions = data;
        this.nthSkillOptions = data;
      },
      error => {
        this.presentToast("There was an error retrieving the list of skills, please try again");
      }
    );
  }

  /*
    Prepare the first step upon entering the page.
  */
  ionViewDidEnter() {
    let formsArray = [
      this.form0,
      this.form1,
      this.form2,
      this.form3,
      this.form4,
      this.form5,
      this.form6,
      this.form7
    ];

    this.formSeq.init(formsArray);
  }

  /*
    Continue to the next part of job creation.
  */
  continueClicked() {
    if (this.formSeq.switchingStep) return;

    let customValid = true;

    // Custom validation for certain steps
    if (this.formSeq.currentStep == 2 && this.reqSkills.length == 0) {
      customValid = false;
    }

    if (this.formSeq.currentStep == 7 && (this.linksList.length < 1 || this.linksList.length > 3)) {
      customValid = false;
    }

    if (this.formSeq.currentForm && this.formSeq.currentForm.valid && customValid) {
      if (this.formSeq.currentStep == this.formSeq.maxSteps) {
        this.saving = true;
        this.jobModel.requiredSkills = this.reqSkills;
        this.jobModel.niceToHaveSkills = this.nthSkills;
        this.jobModel.presentationLinks = this.linksList;
        this.jobModel.recruiterId = this.recruiter.id;
        this.jobModel.niceToHaveSkillsWeight = this.jobModel.niceToHaveSkillsWeight / 100;
        this.jobModel.matchThreshold = this.jobModel.matchThreshold / 100;

        // Create the job using the API
        this.jobPostingService.addJob(this.recruiter.company.id, this.jobModel).subscribe(
          data => {
            this.saving = false;
            this.navCtrl.setRoot(CompanyTabsPage, { message: "New job successfully created" });
          },
          error => {
            this.presentToast("There was an error creating the job, please try again later");
            this.saving = false;
          }
        );
      }
      else {
        this.formSeq.nextStep();

        // Custom init rules at certain steps
        if (this.formSeq.currentStep == 3) {
          this.nthSkillOptions = this.reqSkillOptions;
          this.removeNthSkillOptions(this.jobModel.requiredSkills);
        }
      }
    }
    else {
      this.presentToast(this.formSeq.formErrorMessages[this.formSeq.currentStep]);
    }
  }

  /*
    Navigate back to the previous screen.
  */
  backBtn() {
    if (this.formSeq.switchingStep) return;
    if (this.saving) return;
    
    if (this.formSeq.currentStep == this.formSeq.startStep) {
      this.navCtrl.pop();
    }
    else {
      this.formSeq.previousStep();
    }
  }

  /*
    Remove the required skill at the given index from the job model.
  */
  removeReqSkill(index) {
    this.reqSkills.splice(index, 1);
  }

  /*
    Remove the nice to have skill at the given index from the job model.
  */
  removeNthSkill(index) {
    this.nthSkills.splice(index, 1);
  }

  /*
    Remove the given array of skills from the skills options.
    Used to remove skills selected as required skills from the previous
    step to prevent duplicates.
  */
  removeNthSkillOptions(toRemove) {
    let values = toRemove;

    values.forEach(value => {
      let skillIndex = this.nthSkillOptions.findIndex(skill => skill.id == value.id);
      if (skillIndex != undefined && skillIndex > -1) {
        this.nthSkillOptions.splice(skillIndex, 1);
      }
    });
  }

  /*
    Remove the presentation link at the given index from the job's list.
  */
  removeLink(index) {
    this.linksList.splice(index, 1);
  }

  /*
    Add a new presentation link to the list for this job. Shows a modal to choose
    profile link or create a new one.
  */
  addLink() {
    let modal = this.modalCtrl.create(PresentationLinkAddModal, { model: this.recruiter.company });
    modal.onDidDismiss(data => {
      if (data) {
        this.linksList.push(data);
      }
    });
    modal.present();
  }

  /*
    Show an alert dialog explaining the job description.
  */
  descriptionInfo() {
    this.showAlert(
      "Job Description",
      "Write a description of the job, the responsibilities involved, and other details you may want a student to know about the position. Avoid writing out job skills in the description, for those will be added later. The first 200 characters of the description will be shown to students when they first match."
    );
  }

  /*
    Show an alert dialog explaining required skills.
  */
  reqSkillsInfo() {
    this.showAlert(
      "Required Skills",
      "Required skills are skills that a student must have in order to be matched with a job position. Adding more will refine your matches to ensure applicants are closer to what you're looking for, but too many can result in fewer matches."
    );
  }

  /* 
    Show an alert dialog explaining nice to have skills weight.
  */
  nthSkillsWeightInfo() {
    this.showAlert(
      "Nice to Have Skills Weight",
      "Nice to have skills weight determines how heavily these skills will be used for matching. A higher number means a student will need to have more of these skills in order to be matched."
    );
  }

  /* 
    Show an alert dialog explaining nice to have skills.
  */
  nthSkillsInfo() {
    this.showAlert(
      "Nice to Have Skills",
      "Nice to have skills are skills for the job that are not required to be matched, but a student having one or more of these skills would be a plus for them. Matching on nice to have skills will improve a student's match score, showing them further towards the top of the list."
    );
  }

  /*
    Show an alert dialog explaining the minimum GPA.
  */
  minGpaInfo() {
    this.showAlert(
      "Minimum GPA",
      "Students with a GPA below this number will not be matched."
    );
  }

  /*
    Show an alert dialog explaining has work experience.
  */
  workExperienceInfo() {
    this.showAlert(
      "Has Work Experience",
      "If toggled on, students with no work experience on their profile will not be matched."
    );
  }

  /*
    Show an alert dialog explaining the job duration.
  */
  durationInfo() {
    this.showAlert(
      "Job Duration",
      "A job position may no longer be applied to after the time specified in this field has passed. Any students in the process of applying will lose the ability to finish, but any completed applications may still be viewed on both ends."
    );
  }

  /*
    Show an alert dialog explaining the match threshold.
  */
  thresholdInfo() {
    this.showAlert(
      "Match Threshold",
      "The match threshold determines how close an applicant must match in order to see the position and apply. A higher value will result in less matches, but those matches will fit the job's requirements more closely."
    );
  }

  /*
    Show an alert dialog explaining the problem statement.
  */
  problemStatementInfo() {
    this.showAlert(
      "Problem Statement",
      "Provide a short statement specifying a problem that may often be encountered in the job position and describe some of the technologies and techniques typically used. This isn't intended to be a question for the student, but a short statement giving an idea of what work to expect on the job."
    );
  }

  /*
    Show an alert dialog explaining the presentation phase.
  */
  presentationInfo() {
    this.showAlert(
      "Presentation Links",
      "Provide any links that you would like students to see when applying to the job. A link could be to a company video, a website, or anything else you'd like."
    );
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
