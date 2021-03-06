import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { StudentTabsPage } from '@app/pages/student';

import { PresentationLinkAddModal } from '@app/pages/modals';

import {
  StudentModel,
  PresentationLinkModel
} from '@app/models';

import {
  DataService,
  StudentService,
  HelperService
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
  public loading = false;

  // ngForm object for validation control
  @ViewChild('linksForm') linksForm;
  public links: Array<PresentationLinkModel> = [];

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public dataService: DataService,
    private studentService: StudentService,
    private helperService: HelperService
  ) {
    this.student = navParams.get("student");
    this.links = this.helperService.convertLinkTypes(this.student.presentationLinks.slice(0));
    this.links = this.helperService.sortById(this.links, true);
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
  */
  removeLink(index) {
    this.loading = true;
    let link = new PresentationLinkModel(this.links[index]);

    if (link.id != null) {
      this.studentService.deleteStudentPresentationLink(this.student.id, link.id).subscribe(
        resData => { },
        res => {
          this.links.splice(index, 1);
          this.loading = false;
        }
      );
    }
    else {
      this.links.splice(index, 1);
      this.loading = false;
    }
  }

  /*
    Add a new presentation link to the list. Shows a modal to create a new link.
  */
  addLink() {
    let modal = this.modalCtrl.create(PresentationLinkAddModal, { model: this.student, allowSave: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.loading = true;
        this.studentService.addStudentPresentationLink(this.student.id, data).subscribe(
          resData => {
            this.links.push(this.helperService.convertSingleLinkType(resData));
            this.loading = false;
          },
          res => { }
        );
      }
    });
    modal.present();
  }

  /*
    Displays an alert showing the clicked link's details.
  */
  showLinkDetails(link) {
    this.showAlert("Link Details", link.title + ": " + link.link);
  }

  /*
    Save the changes to the student presentation links in the model and the DB.
  */
  saveChanges() {
    this.loading = true;
    if (this.linksForm && this.linksForm.valid) {
      this.student.presentationLinks = this.links.slice(0);
      this.loading = false;
      this.navCtrl.setRoot(StudentTabsPage);
    }
    else {
      this.presentToast("There was an error saving your presentation links");
      this.loading = false;
    }
  }

  /*
    Navigate back to the previous screen.
  */
  backBtn() {
    this.student.presentationLinks = this.links;
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
