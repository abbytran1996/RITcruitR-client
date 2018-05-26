import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { StudentTabsPage } from '@app/pages/student';

import { PresentationLinkAddModal } from '@app/pages/modals';

import { StudentModel } from '@app/models';

import {
  DataService,
  StudentService
} from '@app/services';

//=========================================================================
// * StudentPresentationLinksPage                                                   
//=========================================================================
// - Page to edit a student's saved profile presentation links.
//_________________________________________________________________________
@Component({
  selector: 'page-student-presentation-links',
  templateUrl: 'student-presentation-links.html'
})
export class StudentPresentationLinksPage {

  public student: StudentModel;

  // ngForm object for validation control
  @ViewChild('linksForm') linksForm;
  links = [];

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
  }

  /*
    Show an alert dialog explaining the presentation phase.
  */
  presentationInfo() {
    this.showAlert(
      "Presentation Links",
      "Presentation links are links to anything you may want an employer to see when applying to a job. A link could be to a video of yourself, a personal website, a project you've worked on, etc. These links will be used later when applying to jobs."
    );
  }

  /*
    Remove the presentation link at the given index from the list.
    Doesn't update in the DB at this point, just makes the "unsaved" change locally.
  */
  removeLink(index) {
    this.links.splice(index, 1);
  }

  /*
    Add a new presentation link to the list. Shows a modal to create a new link.
  */
  addLink() {
    let modal = this.modalCtrl.create(PresentationLinkAddModal, { model: this.student, allowExisting: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.links.push(data);
      }
    });
    modal.present();
  }

  /*
    Save the changes to the student presentation links in the model and the DB.
  */
  saveChanges() {
    if (this.linksForm && this.linksForm.valid) {
      this.student.presentationLinks = this.links;
      
      // TODO: Make API call to save presentation links (endpoint for mass update needs to be made)
      this.navCtrl.setRoot(StudentTabsPage, { message: "Presentation Links updated successfully" });
    }
    else {
      this.presentToast("There was an error saving your presentation links");
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
