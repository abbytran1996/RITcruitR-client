import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { PresentationLinkAddModal } from '../../modals/presentation-link-add/presentation-link-add';

import { StudentModel } from '../../models/student.model';
import { MatchModel } from '../../models/match.model';

import { StudentService } from '../../app/services/student.service';

const fadeTime = 400;

@Component({
  selector: 'page-student-phase-2',
  templateUrl: 'student-phase-2.html'
})
export class StudentPhase2Page {

  public pageLoading = true;
  public student: StudentModel;
  public matchList: any;
  public match: MatchModel;
  public matchIndex = 0;
  public stage = 0;
  public maxStage = 1;

  // Animation variables
  public fadeLeft = false;
  public fadeLeftInstant = false;
  public fadeRight = false;
  public fadeRightInstant = false;
  public matchSuccess = false;
  public matchSuccessFade = false;
  public matchSuccessTransform = false;
  public matchSuccessContentFade = false;
  public hideCard = false;

  // Video variables
  public browser;

  // Reorder list of presentation links
  public linksList = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private studentService: StudentService,
    private iab: InAppBrowser,
    private sanitizer: DomSanitizer
  ) {
    this.student= navParams.get("student");
  }

  ionViewDidEnter() {
    if (this.matchList == undefined || this.matchList.length < 1) {
      this.pageLoading = true;
      this.getPhase2Matches();
    }
  }

  companyPresentationInfo() {
    this.showAlert(
      "Company Presentation",
      "Take a look at these links to see what the company offering the job is all about. A link could be to a company video, website, project repository, or anything they'd like you to see. Tap a link to open it."
    );
  }

  yourPresentationInfo() {
    this.showAlert(
      "Your Presentation",
      "This is your chance to show the recruiter anything of yours that you would like to share. This could be a link to a video of yourself, a project link, a personal website, or anything else."
    );
  }

  backBtn() {
    this.stage--;
  }

  interested() {
    if (this.stage + 1 <= this.maxStage) {
      this.stage++;
    }
    else {
      if (this.linksList && this.linksList.length > 0 && this.linksList.length <= 3) {
        this.match.studentPresentationLinks = this.linksList;

        // API call to submit match with presentation links
        this.studentService.submitMatchPresentationPhase(this.match.id, this.match.studentPresentationLinks).subscribe(
          res => { },
          error => {
            if (!error || error.status != 200) {
              console.log("Error submitting presentation links");
              console.log(error);
            }
          }
        );
        this.animateSuccess();
      }
      else {
        this.presentToast("Please add at least one, and at most three presentation link(s) for the recruiter to view.");
      }
    }
  }

  decline() {
    this.studentService.declineMatch(this.match.id).subscribe(
      data => { },
      error => {
        if (!error || error.status != 200) {
          console.log("Error declining match");
          console.log(error);
        }
      }
    );
    
    this.fadeLeft = true;

    setTimeout(() => {
      removeMatchFromArray(this.matchList, this.match);
      this.nextMatch();
      this.fadeLeft = false;
      this.fadeRightInstant = true;

      setTimeout(() => {
        this.fadeRightInstant = false;
      }, 100);
    }, fadeTime);
  }

  nextMatch() {
    if (this.matchIndex + 1 < this.matchList.length) {
      this.matchIndex = this.matchIndex + 1;
    }
    else {
      this.matchIndex = 0;
    }

    this.stage = 0;
    this.prepMatch();
  }

  sanitizeURL(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openLink(link) {
    // Open browser app separately
    window.open(link, '_system', 'location=yes');
  }

  removeLink(index) {
    this.linksList.splice(index, 1);
  }

  addLink() {
    let modal = this.modalCtrl.create(PresentationLinkAddModal, { model: this.student });
    modal.onDidDismiss(data => {
      if (data) {
        this.linksList.push(data);
      }
    });
    modal.present();
  }

  animateSuccess() {
    this.matchSuccess = true;

    setTimeout(() => {
      this.matchSuccessFade = true;
      this.matchSuccessTransform = true;
      this.hideCard = true;

      setTimeout(() => {
        this.hideCard = false;
        this.matchSuccessContentFade = true;
        this.fadeLeft = true;

        setTimeout(() => {
          this.stage = 0;
        }, fadeTime / 2);

        setTimeout(() => {
          removeMatchFromArray(this.matchList, this.match);
          this.nextMatch();
          this.fadeLeft = false;
          this.fadeRightInstant = true;

          setTimeout(() => {
            this.fadeRightInstant = false;
          }, 100);
        }, fadeTime);

        setTimeout(() => {
          this.matchSuccessFade = false;
          this.matchSuccessContentFade = false;
          this.matchSuccessTransform = false;

          setTimeout(() => {
            this.matchSuccess = false;
          }, 200);
        }, 500);
      }, 100);
    }, 100);
  }

  getPhase2Matches() {
    this.matchList = this.studentService.getPhase2Matches(this.student.id).subscribe(
      res => {
        this.matchList = res;

        if (this.matchList != undefined && this.matchList.length > 0) {
          this.matchList.sort((a, b) => {
            if (a.matchStrength < b.matchStrength) return 1;
            else if (a.matchStrength > b.matchStrength) return -1;
            else return 0;
          });

          this.matchIndex = 0;
          this.prepMatch();
        }
        else {
          this.pageLoading = false;
        }
      },
      error => {
        console.log("Error getting presentation phase matches");
        console.log(error);
      }
    );
  }

  prepMatch() {
    this.match = this.matchList[this.matchIndex];

    // No matches in this phase
    if (this.match == undefined) {
      return;
    }

    let matchPoints = { industry: false };

    // Check industry matches
    this.student.preferredIndustries.forEach(industry => {
      if (this.match.job.company.industries.some(ind => ind === industry)) {
        if (!matchPoints.industry) {
          this.match["matchedIndustry"] = industry;
          matchPoints.industry = true;
        }
      }
    });

    this.pageLoading = false;
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

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}

function removeMatchFromArray(array, match) {
  let index = 0;
  let indexToRemove = -1;
  array.forEach(matchInArr => {
    if (matchInArr.id == match.id) {
      indexToRemove = index;
    }

    index++;
  });

  if (indexToRemove > -1) {
    array.splice(indexToRemove, 1);
  }
}
