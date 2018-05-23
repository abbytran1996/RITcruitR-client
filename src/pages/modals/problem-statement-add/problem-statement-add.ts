import { Component, ViewChild } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, ToastController } from 'ionic-angular';

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
  public newStatementModel = {name: "", statement: "", save: false};

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController
  ) {
    // If receiving a statement from the invoker, set the field values
    // to its values.
    if (navParams.get("statement")) {
      this.newStatementModel = navParams.get("statement");
    }
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
      this.dismissSave();
    }
    else {
      this.presentToast("Please enter a name and statement for your new problem statement");
    }
  }

  /*
    Dismiss the modal and send back the newly created problem statement.
  */
  dismissSave() {
    // TODO: Add service call to save new link to profile if save to profile is selected
    this.viewCtrl.dismiss(this.newStatementModel);
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
