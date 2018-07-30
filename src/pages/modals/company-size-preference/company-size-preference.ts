import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import {
  StudentModel
} from '@app/models';

import {
  HelperService,
  DataService,
  StudentService
} from '@app/services';

//=========================================================================
// * CompanySizePreferenceModal                                                   
//=========================================================================
// - Modal to edit a student's company size preference used in matching.
//_________________________________________________________________________
@Component({
  selector: 'modal-company-size-preference',
  templateUrl: 'company-size-preference.html'
})
export class CompanySizePreferenceModal {

  public pageLoading = true;
  public saving = false;
  public student: StudentModel;
  public companySizeOptions = [];
  public studentCompanySize = 0;
  public studentCompanySizeWeight = 0;
  @ViewChild('form') form;

  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public helperService: HelperService,
    private dataService: DataService,
    private studentService: StudentService
  ) {
    this.student = navParams.get("student");
    this.companySizeOptions = this.dataService.getCompanySizesForStudent();

    // TODO when model is updated: Set this.studentCompanySizeWeight = this.student.preferredCompanySizeWeight;
    // TODO when model is updated: Set this.studentCompanySize = this.student.preferredCompanySize;

    this.pageLoading = false;
  }

  /*
    Show an alert dialog explaining what company size preference weight is.
  */
  companySizePrefWeightInfo() {
    this.showAlert(
      "Company Size Weight",
      "The company size weight determines how important the size of a company is to matching. A higher value will result in fewer, but stronger matches that are more often offered by companies closer to your preferred size. A lower value will result in more matches overall, but some may not be offered by companies around your preferred size."
    );
  }

  /*
    Show an alert dialog explaining what company size preference is.
  */
  companySizePrefInfo() {
    this.showAlert(
      "Preferred Company Size",
      "Select the general size of companies you would prefer to work for. If you have no preference, slide the weight slider above all the way to the left."
    );
  }

  /*
    Dismiss the modal with no data and return to the previous screen.
  */
  backClicked() {
    this.viewCtrl.dismiss(false);
  }

  /*
    Called when finished setting the preference.
    Handles some basic validation and dismisses the modal.
  */
  doneClicked() {
    this.saving = true;
    // TODO when model is updated: this.student.preferredCompanySize = this.studentCompanySize;
    // TODO when model is updated: this.student.preferredLocationsWeight = this.studentLocationsWeight;

    this.studentService.updateStudent(this.student).subscribe(
      data => { },
      res => {
        if (res.status == 200) {
          this.saving = false;
          this.viewCtrl.dismiss(true);
        }
        else {
          this.presentToast("There was an error updating your preferences, please try again");
          this.saving = false;
        }
      }
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
