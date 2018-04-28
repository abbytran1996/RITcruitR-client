import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentWorkExperiencePage } from '../student-work-experience/student-work-experience';

import { StudentModel } from '../../models/student.model';

import { DataService } from '../../app/services/data.service';
import { StudentService } from '../../app/services/student.service';

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

    // Get the skills to populate the typeahead
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

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
  }

  removeSkillOptions(toRemove) {
    let values = toRemove;

    values.forEach(value => {
      let skillIndex = this.skillOptions.findIndex(skill => skill.id == value.id);
      if (skillIndex && skillIndex > -1) {
        this.skillOptions.splice(skillIndex, 1);
      }
    });
  }

  removeSkill(index) {
    this.skills.splice(index, 1);
  }

  continueClicked() {
    if (this.skillsForm && this.skillsForm.valid) {
      this.student.skills = this.skills;
      
      this.studentService.updateStudentSkills(this.student.id, this.student.skills).subscribe(
        data => {
          this.navCtrl.push(StudentWorkExperiencePage, { student: this.student, setup: true });
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

  skipClicked() {
    this.navCtrl.push(StudentWorkExperiencePage, {student: this.student, setup: true});
  }

  saveClicked() {
    if (this.skillsForm && this.skillsForm.valid) {
      this.student.skills = this.skills;

      this.studentService.updateStudentSkills(this.student.id, this.student.skills).subscribe(
        data => {
          this.navCtrl.setRoot(TabsPage, { message: "Skills updated successfully" });
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

  // Navigate back to the previous screen
  backBtn() {
    if (this.isSetup) {
     this.student.skills = this.skills;
    }

    this.navCtrl.pop();
  }

  // Present a toast message to the user
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
