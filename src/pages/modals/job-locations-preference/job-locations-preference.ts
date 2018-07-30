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
// * JobLocationsPreferenceModal                                                   
//=========================================================================
// - Modal to edit a student's location preferences used in matching.
//_________________________________________________________________________
@Component({
  selector: 'modal-job-locations-preference',
  templateUrl: 'job-locations-preference.html'
})
export class JobLocationsPreferenceModal {

  public pageLoading = true;
  public saving = false;
  public student: StudentModel;
  public locationOptions = [];
  public studentLocations = [];
  public studentLocationsWeight = 0;
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
    this.locationOptions = this.dataService.getLocations();

    // TODO when model is updated: this.studentLocationsWeight = this.student.preferredLocationsWeight;

    this.student.preferredLocations.forEach(location => {
      let locationIndex = this.locationOptions.findIndex(locationOption => locationOption == location);
      if (locationIndex != undefined && locationIndex > -1) {
        this.studentLocations.push(this.locationOptions[locationIndex]);
      }
    });

    this.pageLoading = false;
  }

  /*
    Remove the location at the given index from the local list.
  */
  removeLocation(index) {
    this.studentLocations.splice(index, 1);
  }

  /*
    Show an alert dialog explaining what location preference weight is.
  */
  locationsPrefWeightInfo() {
    this.showAlert(
      "Locations Weight",
      "The locations weight determines how important the location of a job is to matching. A higher value will result in fewer, but stronger matches that are more often offered at your preferred locations. A lower value will result in more matches overall, but some may not be offered at one of your preferred locations."
    );
  }

  /*
    Show an alert dialog explaining what location preference is.
  */
  locationsPrefInfo() {
    this.showAlert(
      "Preferred Locations",
      "Select the locations where you would prefer to work. If you have no preference, you may leave this blank."
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
    this.student.preferredLocations = this.studentLocations;
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
