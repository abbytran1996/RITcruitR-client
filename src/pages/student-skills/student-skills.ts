import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StudentWorkExperiencePage } from '../student-work-experience/student-work-experience';

import { StudentModel } from '../../models/student.model';

import { DataService } from '../../app/services/data.service';

@Component({
  selector: 'page-student-skills',
  templateUrl: 'student-skills.html'
})
export class StudentSkillsPage {

  public student: StudentModel;
  public isSetup = false;

  // ngForm object for validation control
  @ViewChild('skillsForm') skillsForm;

  model = [];
  skillOptions = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public dataService: DataService
  ) {
    this.student = navParams.get("student");
    
    this.skillOptions = this.dataService.getSkills();

    if (navParams.get("setup") == true) {
      this.isSetup = true;
    }
  }

  continueClicked() {
    if (this.skillsForm && this.skillsForm.valid) {
      // TODO: Call API to add skills
      this.navCtrl.push(StudentWorkExperiencePage, {student: this.student, setup: true});
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
      // TODO: Call API to update skills
      this.navCtrl.setRoot(TabsPage, {message: "Skills updated successfully"});
    }
    else {
      this.presentToast("Please select valid skills");
    }
  }

  // Navigate back to the previous screen
  backBtn() {
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
