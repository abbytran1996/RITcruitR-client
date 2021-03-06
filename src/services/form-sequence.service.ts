import { Injectable } from '@angular/core';

@Injectable()
export class FormSequenceService {
    constructor() {}

  public startStep = 0;
  public currentStep = 0;
  public maxSteps = 1;
  public progressWidth = 0;
  public currentForm: any;
  public stepForms = [];
  public formClasses = [];
  public initHide = true;
  public formTitles = [];
  public formErrorMessages = [];
  public switchingStep = false;

  /*
    Reset the form sequence variables.
  */
  reset() {
    this.startStep = 0;
    this.currentStep = 0;
    this.maxSteps = 1;
    this.progressWidth = 0;
    this.currentForm = undefined;
    this.stepForms = [];
    this.formClasses = [];
    this.initHide = true;
  }

  /*
    Initialize the form sequence and derive certain values.
  */
  init(formsArray) {
    this.maxSteps = this.formTitles.length - 1;
    this.calculateProgressWidth();

    if (this.initHide == true) {
      this.stepForms = formsArray;

      this.stepForms.forEach((val, index) => {
        if (index > this.startStep) {
          this.formClasses.push("ani-outright-init ani-hide");
        }
        else if (index < this.startStep) {
          this.formClasses.push("ani-outleft-init ani-hide");
        }
        else {
          this.formClasses.push("");
        }
      });

      this.currentForm = this.stepForms[this.currentStep];
      this.initHide = false;
    }
  }

  /*
    Increment and prepare the next step of the form sequence.
  */
  nextStep() {
    this.switchingStep = true;

    this.formClasses[this.currentStep] = "ani-outleft";
    this.currentStep++;
    this.formClasses[this.currentStep] = "ani-hide";
    setTimeout(() => {
      this.formClasses[this.currentStep - 1] = this.formClasses[this.currentStep - 1] + " ani-hide";
      this.formClasses[this.currentStep] = "ani-inright";
    }, 600);
    setTimeout(() => {
      this.formClasses[this.currentStep] = "";
      this.switchingStep = false;
    }, 900);

    this.currentForm = this.stepForms[this.currentStep];
    this.calculateProgressWidth();
  }

  /*
    Decrement and prepare the previous step of the form sequence.
  */
  previousStep() {
    this.switchingStep = true;

    this.formClasses[this.currentStep] = "ani-outright";
    this.currentStep--;
    this.formClasses[this.currentStep] = "ani-hide";
    setTimeout(() => {
      this.formClasses[this.currentStep + 1] = this.formClasses[this.currentStep + 1] + " ani-hide";
      this.formClasses[this.currentStep] = "ani-inleft";
    }, 600);
    setTimeout(() => {
      this.formClasses[this.currentStep] = "";
      this.switchingStep = false;
    }, 900);

    this.currentForm = this.stepForms[this.currentStep];
    this.calculateProgressWidth();
  }

  /*
    Set the form sequence step to the given step.
  */
  setStep(step) {
    this.switchingStep = true;
    let lastStep = this.currentStep;

    if (step > this.currentStep) {
      this.formClasses[this.currentStep] = "ani-outleft";
      this.currentStep = step;
      this.formClasses[this.currentStep] = "ani-hide";
      setTimeout(() => {
        this.formClasses[lastStep] = this.formClasses[lastStep] + " ani-hide";
        this.formClasses[this.currentStep] = "ani-inright";
      }, 600);
      setTimeout(() => {
        this.formClasses[this.currentStep] = "";
        this.switchingStep = false;
      }, 900);
    }
    else if (step < this.currentStep) {
      this.formClasses[this.currentStep] = "ani-outright";
      this.currentStep = step;
      this.formClasses[this.currentStep] = "ani-hide";
      setTimeout(() => {
        this.formClasses[lastStep] = this.formClasses[lastStep] + " ani-hide";
        this.formClasses[this.currentStep] = "ani-inleft";
      }, 600);
      setTimeout(() => {
        this.formClasses[this.currentStep] = "";
        this.switchingStep = false;
      }, 900);
    }

    this.currentForm = this.stepForms[this.currentStep];
    this.calculateProgressWidth();
  }

  /*
    Calculate the width of the progress bar based on the current and max steps in the sequence.
  */
  calculateProgressWidth() {
    this.progressWidth = ((this.currentStep + 1 - this.startStep) / (this.maxSteps + 1 - this.startStep) * 100);
  }
}
