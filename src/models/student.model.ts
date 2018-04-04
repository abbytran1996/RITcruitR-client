import { UserModel } from './user.model';
import { EducationDetailsModel } from './education-details.model';
import { StudentContactModel } from './student-contact.model';

export class StudentModel {

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public skills: any,
    public email: string,
    public graduationDate: string,
    public school: string,
    public major: string,
    public gpa: number,
    public user: UserModel,
    public phoneNumber: string,
    public contactEmail: string,
    public website: string,
    public preferredStates: any,
    public preferredIndustries: any,
    public preferredCompanySize: any,
    public resumeLocation: string) {
  }

  public static createStudentFromApiData(apiData: any): StudentModel {
    return new StudentModel(
      apiData.id,
      apiData.firstName,
      apiData.lastName,
      apiData.skills,
      apiData.email,
      apiData.graduationDate,
      apiData.school,
      apiData.major,
      apiData.gpa,
      new UserModel(apiData.user.id, apiData.user.username, apiData.user.roles),
      apiData.phoneNumber,
      apiData.contactEmail,
      apiData.website,
      apiData.preferredStates,
      apiData.preferredIndustries,
      apiData.preferredCompanySize,
      apiData.resumeLocation
    );
  }

  public updateEducation(educationDetails: EducationDetailsModel): void {
    this.graduationDate = educationDetails.graduationDate + "-02";
    this.school = educationDetails.school;
    this.major = educationDetails.major;
    this.gpa = Number(educationDetails.gpa);
  }

  public updateContact(contact: StudentContactModel): void {
    this.contactEmail = contact.contactEmail;
    this.phoneNumber = contact.phoneNumber;
    this.website = contact.website;
  }
}
