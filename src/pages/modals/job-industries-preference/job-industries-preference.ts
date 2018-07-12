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
// * JobIndustriesPreferenceModal                                                   
//=========================================================================
// - Modal to edit a student's industry preferences used in matching.
//_________________________________________________________________________
@Component({
  selector: 'modal-job-industries-preference',
  templateUrl: 'job-industries-preference.html'
})
export class JobIndustriesPreferenceModal {

  public pageLoading = true;
  public saving = false;
  public student: StudentModel;
  public industryOptions = [];
  public studentIndustries = [];
  public studentIndustriesWeight = 0;
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
    this.industryOptions = this.dataService.getIndustries();

    // TODO when model is updated: Set this.studentIndustriesWeight = this.student.preferredIndustriesWeight;

    this.student.preferredIndustries.forEach(industry => {
      let industryIndex = this.industryOptions.findIndex(industryOption => industryOption == industry);
      if (industryIndex != undefined && industryIndex > -1) {
        this.studentIndustries.push(this.industryOptions[industryIndex]);
      }
    });

    this.pageLoading = false;
  }

  /*
    Remove the industry at the given index from the local list.
  */
  removeIndustry(index) {
    this.studentIndustries.splice(index, 1);
  }

  /*
    Show an alert dialog explaining what industries preference weight is.
  */
  industriesPrefWeightInfo() {
    this.showAlert(
      "Industries Weight",
      "The industries weight determines how important the industry of a job is to matching. A higher value will result in fewer, but stronger matches that more often operate within one of your preferred industries. A lower value will result in more matches overall, but some may not operate within your preferred industries."
    );
  }

  /*
    Show an alert dialog explaining what industries preference is.
  */
  industriesPrefInfo() {
    this.showAlert(
      "Preferred Industries",
      "Select the industries in which you would prefer to work. If you have no preference, you may leave this blank."
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
    this.student.preferredIndustries = this.studentIndustries;
    // TODO when model is updated: this.student.preferredIndustriesWeight = this.studentIndustriesWeight;

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
