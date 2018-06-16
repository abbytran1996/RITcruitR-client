import { CompanyModel } from './company.model';
import { RecruiterModel } from './recruiter.model';

export class JobModel {
  public id: number = null;
  public status: number = null;
  public positionTitle: string = "";
  public description: string = "";
  public locations: any = [];
  public requiredSkills: any = [];
  public niceToHaveSkills: any = [];
  public niceToHaveSkillsWeight: number = 0;
  public minGpa: number = null;
  public hasWorkExperience: boolean = false;
  public matchThreshold: number = 50;
  public duration: number = null;
  public problemStatement: string = "";
  public video: string = "";
  public presentationLinks: any = [];
  public company: CompanyModel = new CompanyModel();
  public recruiter: RecruiterModel = new RecruiterModel();

  constructor(init?: any) {
    if (init) {
      this.id = init.id || null;
      this.status = init.status || null;
      this.positionTitle = init.positionTitle || "";
      this.description = init.description || "";
      this.locations = init.locations || [];
      this.requiredSkills = init.requiredSkills || [];
      this.niceToHaveSkills = init.niceToHaveSkills || [];
      this.niceToHaveSkillsWeight = init.niceToHaveSkillsWeight || 0;
      this.minGpa = init.minGpa || null;
      this.hasWorkExperience = init.hasWorkExperience || false;
      this.matchThreshold = init.matchThreshold || 50;
      this.duration = init.duration || null;
      this.problemStatement = init.problemStatement || "";
      this.video = init.video || "";
      this.presentationLinks = init.presentationLinks || [];
      this.company = new CompanyModel(init.company) || new CompanyModel();
      this.recruiter = new RecruiterModel(init.recruiter) || new RecruiterModel();
    }
  }
}
