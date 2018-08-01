import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController, ModalController } from 'ionic-angular';

import {
  CompanyTabsPage,
  CompanyRecruiterRegisterPage
} from '@app/pages/company';

import {
  RecruiterDetailsModal
} from '@app/pages/modals';

import {
  CompanyModel,
  RecruiterModel
} from '@app/models';

import {
  DataService,
  RecruiterService
} from '@app/services';

//=========================================================================
// * CompanyManageRecruitersPage                                                   
//=========================================================================
// - Page to manage the company's recruiters registered for the app.
//_________________________________________________________________________
@Component({
  selector: 'page-company-manage-recruiters',
  templateUrl: 'company-manage-recruiters.html'
})
export class CompanyManageRecruitersPage {

  public recruiterModel: RecruiterModel = new RecruiterModel();
  public companyModel: CompanyModel = new CompanyModel();
  public allRecruiters: Array<RecruiterModel> = [];
  public loading = true;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public dataService: DataService,
    public recruiterService: RecruiterService
  ) {
    this.recruiterModel = navParams.get("recruiter");
    this.companyModel = this.recruiterModel.company;
  }

  /*
    Load needed data on page enter.
  */
  ionViewDidEnter() {
    this.loading = true;
    this.getRecruiters();
  }

  /*
    Get all of the recruiters for the company.
  */
  getRecruiters() {
    this.recruiterService.getRecruitersByCompany(this.companyModel.id).subscribe(
      resData => {
        let recs: Array<RecruiterModel> = resData;
        let thisRec = this.recruiterModel;
        recs.sort((a, b) => {
          if (thisRec.id == a.id) return -1;
          else if (thisRec.id == b.id) return 1;
          else return 0;
        });

        this.allRecruiters = recs;
        this.loading = false;
      },
      res => { }
    );
  }

  /*
    Show the add new recruiter page.
  */
  addRecruiter() {
    this.navCtrl.push(CompanyRecruiterRegisterPage, { recruiter: this.recruiterModel, startStep: 2, addRecruiter: true });
  }

  /*
    Remove the recruiter at the given index from the list and delete the recruiter's account.
  */
  removeRecruiter(index) {
    if (this.recruiterModel.id == this.allRecruiters[index].id) {
      this.showAlert("Can't Remove Recruiter", "Sorry, but you cannot remove yourself as a recruiter while logged in.");
      return;
    }

    let alert = this.alertCtrl.create({
      title: 'Confirm Removing Recruiter',
      message: 'Are you sure you want to remove this recruiter? The removed recruiter will no longer be able to login.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.loading = true;
            let recruiter = new RecruiterModel(this.allRecruiters[index]);

            this.recruiterService.deleteRecruiter(this.allRecruiters[index].id).subscribe(
              resData => { },
              res => {
                this.allRecruiters.splice(index, 1);
                this.loading = false;
              }
            );
          }
        }
      ]
    });

    alert.present();
  }

  /*
    Show more in-depth details for the given recruiter.
  */
  showRecruiterDetails(recruiter) {
    let modal = this.modalCtrl.create(RecruiterDetailsModal, { recruiterSelf: this.recruiterModel, recruiterShown: recruiter });
    modal.onDidDismiss(data => {
      if (data.change == true && data.isPrimary != data.ogPrimary) {
        this.loading = true;

        if (data.isPrimary == true) {
          this.recruiterService.makePrimaryRecruiter(recruiter.id).subscribe(
            resData => { },
            res => {
              this.getRecruiters();
            }
          );
        }
        else {
          this.recruiterService.revokePrimaryRecruiter(recruiter.id).subscribe(
            resData => { },
            res => {
              this.getRecruiters();
            }
          );
        }
      }
    });
    modal.present();
  }

  /*
    Called when the done button is clicked.
  */
  doneClicked() {
    this.navCtrl.pop();
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
