import { element } from 'protractor';
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
  public matchedRecommendedSkills: any = [];
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
	    this.matchedRecommendedSkills = init.matchedRecommendedSkills || [];
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
      skills: [],
      otherSkills: []
    };

    // Set match industry to show
    if (this.matchedIndustries.length > 0) {
      this.matchDisplay.industry = {value: this.matchedIndustries[0].name, matched: true};
    }
    else {
      this.matchDisplay.industry = { value: this.job.company.industries[0].name, matched: false };
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
    let numRecommendedSkills = 1;
    let recommendedSkills = [];

    // Add up to max number of matched required skills
    this.matchedRequiredSkills.forEach(reqSkill => {
      if (reqSkills.length < numReqSkills) {
        reqSkills.push({ value: reqSkill, matched: true });
      }
    });
    this.matchDisplay.skills = this.matchDisplay.skills.concat(reqSkills);

    // Add up to max number of matched recommended skills
    this.matchedRecommendedSkills.forEach(recommendedSkill => {
      if (recommendedSkills.length < numRecommendedSkills) {
        recommendedSkills.push({ value: recommendedSkill, matched: true });
      }
    });
    this.matchDisplay.skills = this.matchDisplay.skills.concat(recommendedSkills);

    // If the total skill number hasn't been reached, add non-matched skills
    if (this.matchDisplay.skills.length < (numReqSkills + numRecommendedSkills)) {

      // If this is a match being viewed by a student
      if (this.isStudentMatch) {
        // Start with recommended skills to add some variety because most of the required skills were likely matched
        let testRecSkills = this.removeSkillIntersection(this.job.recommendedSkills, this.matchedRecommendedSkills);
        testRecSkills.forEach(recommendedSkill => {
          if (this.matchDisplay.skills.length < (numReqSkills + numRecommendedSkills)) {
            this.matchDisplay.skills.push({ value: recommendedSkill, matched: false });
          }
        });

        let testReqSkills = this.removeSkillIntersection(this.job.requiredSkills, this.matchedRequiredSkills);
        testReqSkills.forEach(reqSkill => {
          if (this.matchDisplay.skills.length < (numReqSkills + numRecommendedSkills)) {
            this.matchDisplay.skills.push({ value: reqSkill, matched: false });
          }
        });
      }

      // If this is a match being viewed by a recruiter
      else {
        let testStudentSkills = this.removeSkillIntersection(this.student.skills, this.matchedRequiredSkills);
        testStudentSkills = this.removeSkillIntersection(testStudentSkills, this.matchedRecommendedSkills);
        testStudentSkills.forEach(studSkill => {
          if (this.matchDisplay.skills.length < (numReqSkills + numRecommendedSkills)) {
            this.matchDisplay.skills.push({ value: studSkill, matched: false });
          }
        });

        // Prepare the list of all other student skills for the recruiter
        let usedSkills = [];
        this.matchDisplay.skills.forEach(skill => {
          usedSkills.push(skill.value);
        });
        
        let otherSkills = this.removeSkillIntersection(this.student.skills, usedSkills);
        otherSkills.forEach(skill => {
          let reqIndex = this.matchedRequiredSkills.findIndex(reqSkill => { return skill.id == reqSkill.id });
          let recIndex = this.matchedRecommendedSkills.findIndex(recSkill => { return skill.id == recSkill.id });
          if ((reqIndex != undefined && reqIndex > -1) || (recIndex != undefined && recIndex > -1)) {
            this.matchDisplay.otherSkills.push({ value: skill, matched: true });
          }
          else {
            this.matchDisplay.otherSkills.push({ value: skill, matched: false });
          }
        });
      }
    }
  }

  /*
    Removes the intersected skills in the given two arrays from the first array and returns the result.
  */
  removeSkillIntersection(arr1, arr2) {
    return arr1.filter(function (skill1) {
      return arr2.findIndex(skill2 => skill1.id == skill2.id) < 0; // Returns true for skills found in arr2
    });
  }
}
