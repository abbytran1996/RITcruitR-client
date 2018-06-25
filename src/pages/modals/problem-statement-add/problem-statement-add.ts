import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import {
  StudentModel,
  ProblemStatementModel
} from '@app/models';

import {
  StudentService
} from '@app/services';

//=========================================================================
// * ProblemStatementAddModal                                                   
//=========================================================================
// - Modal to add a problem statement to a match.
//_________________________________________________________________________
@Component({
  selector: 'modal-problem-statement-add',
  templateUrl: 'problem-statement-add.html'
})
export class ProblemStatementAddModal {

  @ViewChild('newForm') newForm;
  public newStatementModel = new ProblemStatementModel();
  public saveStatement: boolean = false;
  public student: StudentModel;
  public allowSave = true;

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private studentService: StudentService
  ) {
    this.student = navParams.get("student");
    this.allowSave = navParams.get("allowSave");
    if (this.allowSave == undefined) this.allowSave = true;

    // If receiving a statement from the invoker, set the field values
    // to its values.
    if (navParams.get("statement")) {
      this.newStatementModel = navParams.get("statement");
    }
  }

  /*
    Show an alert dialog explaining what a student problem statement is.
  */
  yourProbStatementInfo() {
    this.showAlert(
      "Your Problem Statement",
      "Your problem statement should be a short paragraph describing a project or problem you've worked on. Give recruiters an idea of the work you've done and what you like to do."
    );
  }

  /*
    Dismiss the modal with no data and return to the previous screen.
  */
  backClicked() {
    this.viewCtrl.dismiss();
  }

  /*
    Called when finished creating the problem statement.
  */
  doneClicked() {
    if (this.newForm && this.newForm.valid) {
      if (this.saveStatement) {
        this.dismissSave();
      }
      else {
        this.viewCtrl.dismiss(this.newStatementModel);
      }
    }
    else {
      this.presentToast("Please enter a name and statement for your new problem statement");
    }
  }

  /*
    Dismiss the modal and send back the newly created problem statement.
  */
  dismissSave() {
    this.studentService.addStudentProblemStatement(this.student.id, this.newStatementModel).subscribe(
      resData => {
        this.student.problemStatements.push(new ProblemStatementModel(resData));
        this.viewCtrl.dismiss(resData);
      },
      res => { }
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
