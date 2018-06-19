import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { StudentTabsPage } from '@app/pages/student';

import { ProblemStatementAddModal } from '@app/pages/modals';

import { StudentModel } from '@app/models';

import {
  DataService,
  StudentService
} from '@app/services';

//=========================================================================
// * StudentProblemStatementsPage                                                   
//=========================================================================
// - Page to edit a student's saved profile problem statements.
// - The problem statements saved here can be used later in matching.
//_________________________________________________________________________
@Component({
  selector: 'page-student-problem-statements',
  templateUrl: 'student-problem-statements.html'
})
export class StudentProblemStatementsPage {

  public student: StudentModel;
  public loading = false;

  // ngForm object for validation control
  @ViewChild('statementForm') statementForm;
  statements = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public dataService: DataService,
    private studentService: StudentService
  ) {
    this.student = navParams.get("student");

    // TODO: Set this.statements = this.student.problemStatements.slice(0) when student model is updated in DB
  }

  /*
    Show an alert dialog explaining the presentation phase.
  */
  problemStatementInfo() {
    this.showAlert(
      "Problem Statement",
      "A problem statement is a short paragraph describing a project or problem you've worked on. Give recruiters an idea of the work you've done and what you like to do. The statements saved here can be used later when applying to matched jobs."
    );
  }

  /*
    Remove the problem statement at the given index from the list.
    Doesn't update in the DB at this point, just makes the "unsaved" change locally.
  */
  removeStatement(index) {
    this.statements.splice(index, 1);
  }

  /*
    Add a new problemStatement to the list. Shows a modal to create the new statement.
  */
  addStatement() {
    let modal = this.modalCtrl.create(ProblemStatementAddModal, { model: this.student, allowSave: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.statements.push(data);
      }
    });
    modal.present();
  }

  /*
    Save the changes to the student problem statements in the model and the DB.
  */
  saveChanges() {
    this.loading = true;
    if (this.statementForm && this.statementForm.valid) {
      // TODO: Set student problem statements to the local statements list (Student doesn't currently have list of problem statements)
      
      this.loading = false;
      // TODO: Make API call to save problem statements (endpoint for mass update needs to be made)
      this.navCtrl.setRoot(StudentTabsPage, { message: "Problem Statements updated successfully" });
    }
    else {
      this.presentToast("There was an error saving your problem statements");
      this.loading = false;
    }
  }

  /*
    Navigate back to the previous screen.
  */
  backBtn() {
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
