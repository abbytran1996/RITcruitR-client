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

  constructor(init?: any) {
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
  }
}
