import { CompanyModel } from './company.model';
import { RecruiterModel } from './recruiter.model';
import { UserModel } from './user.model';

export class JobModel {
  constructor(
    public id: number,
    public status: number,
    public positionTitle: string,
    public description: string,
    public locations: any,
    public requiredSkills: any,
    public niceToHaveSkills: any,
    public niceToHaveSkillsWeight: number,
    public minGpa: number,
    public hasWorkExperience: boolean,
    public matchThreshold: number,
    public duration: number,
    public problemStatement: string,
    public video: string,
    public presentationLinks: any,
    public company: CompanyModel,
    public recruiter: RecruiterModel
  ) {}

  public static createJobFromApiData(apiData): JobModel {
    return new JobModel(
      apiData.id,
      apiData.status,
      apiData.positionTitle,
      apiData.description,
      apiData.locations,
      apiData.requiredSkills,
      apiData.niceToHaveSkills,
      apiData.niceToHaveSkillsWeight,
      apiData.minGpa,
      apiData.hasWorkExperience,
      apiData.matchThreshold,
      apiData.duration,
      apiData.problemStatement,
      apiData.video,
      apiData.presentationLinks,
      new CompanyModel(
        apiData.company.id,
        apiData.company.companyName,
        apiData.company.locations,
        apiData.company.industries,
        apiData.company.size,
        apiData.company.approvalStatus,
        apiData.company.presentation,
        apiData.company.companyDescription,
        apiData.company.websiteURL,
        apiData.company.emailSuffix,
        apiData.company.userId,
        apiData.company.presentationLinks
      ),
      new RecruiterModel(
        apiData.recruiter.id,
        apiData.recruiter.firstName,
        apiData.recruiter.lastName,
        apiData.recruiter.email,
        new CompanyModel(
          apiData.recruiter.company.id,
          apiData.recruiter.company.companyName,
          apiData.recruiter.company.locations,
          apiData.recruiter.company.industries,
          apiData.recruiter.company.size,
          apiData.recruiter.company.approvalStatus,
          apiData.recruiter.company.presentation,
          apiData.recruiter.company.companyDescription,
          apiData.recruiter.company.websiteURL,
          apiData.recruiter.company.emailSuffix,
          apiData.recruiter.company.userId,
          apiData.recruiter.company.presentationLinks
        ),
        apiData.recruiter.phoneNumber,
        apiData.recruiter.contactEmail,
        new UserModel(
          apiData.recruiter.user.id,
          apiData.recruiter.user.username,
          apiData.recruiter.user.roles
        )
      )
    );
  }
}
