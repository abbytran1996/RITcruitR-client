import { UserModel } from './user.model';
import { EducationDetailsModel } from './education-details.model';
import { StudentContactModel } from './student-contact.model';
import { StudentJobPreferencesModel } from './student-job-preferences.model';

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
    public preferredLocations: any,
    public preferredIndustries: any,
    public preferredCompanySizes: any,
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
      apiData.preferredLocations,
      apiData.preferredIndustries,
      apiData.preferredCompanySizes,
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

  public updateMatchPreferences(prefs: StudentJobPreferencesModel): void {
    this.preferredLocations = prefs.preferredLocations;
    this.preferredIndustries = prefs.preferredIndustries;
    this.preferredCompanySizes = prefs.preferredCompanySizes;
  }
}
