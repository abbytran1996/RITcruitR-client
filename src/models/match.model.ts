import { StudentModel } from './student.model';
import { JobModel } from './job.model';

export class MatchModel {
  public id: number = null;
  public student: StudentModel = new StudentModel();
  public job: JobModel = new JobModel();
  public matchStrength: number = null;
  public tag: string = "";
  public studentProblemResponse: string = "";
  public studentPresentationLink: string = "";
  public studentPresentationLinks: any = [];
  public matchedRequiredSkills: any = [];
  public matchedNiceToHaveSkills: any = [];
  public matchedIndustries: any = [];
  public matchedLocations: any = [];
  public viewedSinceLastUpdate: boolean = false;
  public timeLastUpdated: any = null;
  public applicationStatus: string = "";
  public currentPhase: string = "";
  public matchDisplay: any = {};
  public isStudentMatch: boolean = true;

  constructor(init?: any, forStudent?: boolean) {
    if (init) {
      this.id = init.id || null;
      this.student = new StudentModel(init.student) || new StudentModel();
      this.job = new JobModel(init.job) || new JobModel();
      this.matchStrength = init.matchStrength || null;
      this.tag = init.tag || "";
      this.studentProblemResponse = init.studentProblemResponse || "";
      this.studentPresentationLink = init.studentPresentationLink || "";
      this.studentPresentationLinks = init.studentPresentationLinks || [];
      this.matchedRequiredSkills = init.matchedRequiredSkills || [];
	    this.matchedNiceToHaveSkills = init.matchedNiceToHaveSkills || [];
	    this.matchedIndustries = init.matchedIndustries || [];
	    this.matchedLocations = init.matchedLocations || [];
      this.viewedSinceLastUpdate = init.viewedSinceLastUpdate || false;
      this.timeLastUpdated = init.timeLastUpdated || null;
      this.applicationStatus = init.applicationStatus || "";
      this.currentPhase = init.currentPhase || "";
    }

    if (forStudent != undefined) {
      this.isStudentMatch = forStudent;
    }

    // Initialize match display values
    this.prepMatch();
  }

  /*
    Prep the match to determine what match data to show on the card.
  */
  prepMatch() {
    this.matchDisplay = {
      industry: {},
      locations: [],
      skills: []
    };

    // Set match industry to show
    if (this.matchedIndustries.length > 0) {
      this.matchDisplay.industry = {value: this.matchedIndustries[0], matched: true};
    }
    else {
      this.matchDisplay.industry = { value: this.job.company.industries[0], matched: false };
    }

    // Set match locations to show
    let numLocations = 2;

    this.matchedLocations.forEach(loc => {
      this.matchDisplay.locations.push({ value: loc, matched: true });
    });

    if (this.matchDisplay.locations.length >= numLocations) {
      this.matchDisplay.locations = this.matchDisplay.locations.slice(0, numLocations);
    }
    else {
      while (this.matchDisplay.locations.length < numLocations) {
        this.job.locations.forEach(loc => {
          this.matchDisplay.locations.push({value: loc, matched: false});
        });
      }
    }

    // Set match required skills to show
    let numReqSkills = 2;
    let reqSkills = [];
    let numNthSkills = 1;
    let nthSkills = [];

    this.matchedRequiredSkills.forEach(reqSkill => {
      if (reqSkills.length < numReqSkills) {
        reqSkills.push({ value: reqSkill, matched: true });
      }
    });
    this.matchDisplay.skills.concat(reqSkills);

    this.matchedNiceToHaveSkills.forEach(nthSkill => {
      if (nthSkills.length < numNthSkills) {
        nthSkills.push({ value: nthSkill, matched: true });
      }
    });
    this.matchDisplay.skills.concat(nthSkills);

    if (this.isStudentMatch) {
      this.job.requiredSkills.forEach(reqSkill => {
        if (this.matchDisplay.skills.length < (numReqSkills + numNthSkills)) {
          this.matchDisplay.skills.push({ value: reqSkill, matched: false });
        }
      });

      this.job.niceToHaveSkills.forEach(nthSkill => {
        if (this.matchDisplay.skills.length < (numReqSkills + numNthSkills)) {
          this.matchDisplay.skills.push({ value: nthSkill, matched: false });
        }
      });
    }
    else {
      this.student.skills.forEach(studSkill => {
        if (this.matchDisplay.skills.length < (numReqSkills + numNthSkills)) {
          this.matchDisplay.skills.push({ value: studSkill, matched: false });
        }
      });
    }
  }
}
