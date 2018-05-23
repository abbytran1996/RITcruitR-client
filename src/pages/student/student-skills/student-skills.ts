import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { 
  StudentTabsPage,
  StudentWorkExperiencePage
} from '@app/pages/student';

import { StudentModel } from '@app/models';

import {
  DataService,
  StudentService
} from '@app/services';

//=========================================================================
// * StudentSkillsPage                                                   
//=========================================================================
// - Page to edit a student's skills.
//_________________________________________________________________________
@Component({
  selector: 'page-student-skills',
  templateUrl: 'student-skills.html'
})
export class StudentSkillsPage {

  public student: StudentModel;
  public isSetup = false;

  // ngForm object for validation control
  @ViewChild('skillsForm') skillsForm;
  skills = [];
  skillOptions = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public dataService: DataService,
    private studentService: StudentService
  ) {
    this.student = navParams.get("student");

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

    // Determine if in setup or now
    if (navParams.get("setup") == true) {
      this.isSetup = true;
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
    Doesn't update in the DB ast this point, just makes the "unsaved" change locally.
  */
  removeSkill(index) {
    this.skills.splice(index, 1);
  }

  /*
    Save the changes to the student skills in the model and the DB.
    If in setup, proceed to the next step, otherwise return to the student tabs page.
  */
  saveChanges() {
    if (this.skillsForm && this.skillsForm.valid) {
      this.student.skills = this.skills;
      
      this.studentService.updateStudentSkills(this.student.id, this.student.skills).subscribe(
        data => {
          if (this.isSetup) {
            this.navCtrl.push(StudentWorkExperiencePage, { student: this.student, setup: true });
          }
          else {
            this.navCtrl.setRoot(StudentTabsPage, { message: "Skills updated successfully" });
          }
        },
        res => {
          this.presentToast("There was an error updating your skills, please try again");
        }
      );
    }
    else {
      this.presentToast("Please select valid skills");
    }
  }

  /*
    Only available in setup. Skip this step and proceed to the next.
  */
  skipClicked() {
    this.navCtrl.push(StudentWorkExperiencePage, {student: this.student, setup: true});
  }

  /*
    Navigate back to the previous screen.
  */
  backBtn() {
    if (this.isSetup) {
     this.student.skills = this.skills;
    }

    this.navCtrl.pop();
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
