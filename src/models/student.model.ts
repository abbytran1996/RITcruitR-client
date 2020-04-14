import { UserModel } from './user.model';
import { StudentEducationModel } from './student-education.model';
import { StudentContactModel } from './student-contact.model';
import { StudentJobPreferencesModel } from './student-job-preferences.model';
import { PresentationLinkModel } from './presentation-link.model';

export class StudentModel {
  private static PREFERRED_LOCATIONS_WEIGHT = 0.4;
  private static PREFERRED_INDUSTRIES_WEIGHT = 0.3;
  private static PREFERRED_COMPANY_SIZE_WEIGHT = 0.2;

  public id: number = null;
  public firstName: string = "";
  public lastName: string = "";
  public skills: any = [];
  public email: string = "";
  public graduationDate: string = "";
  public school: any = null;
  public major: any = null;
  public gpa: number = null;
  public user: UserModel = new UserModel();
  public phoneNumber: string = "";
  public contactEmail: string = "";
  public website: string = "";
  public preferredLocations: any = [];
  public preferredIndustries: any = [];
  public preferredCompanySizes: any = [];
  public preferredLocationsWeight: number = StudentModel.PREFERRED_LOCATIONS_WEIGHT;
  public preferredIndustriesWeight: number = StudentModel.PREFERRED_LOCATIONS_WEIGHT;
  public preferredCompanySizeWeight: number = StudentModel.PREFERRED_LOCATIONS_WEIGHT;
  public presentationLinks: Array<PresentationLinkModel> = [];
  public problemStatements: any = [];
  public isSetup: boolean = false;

  constructor(init?: any) {
    if (init) {
      this.id = init.id || null;
      this.firstName = init.firstName || "";
      this.lastName = init.lastName || "";
      this.skills = init.skills || [];
      this.email = init.email || "";
      this.graduationDate = init.graduationDate || "";
      this.school = init.school || null;
      this.major = init.major || null;
      this.gpa = init.gpa || null;
      this.user = new UserModel(init.user) || new UserModel();
      this.phoneNumber = init.phoneNumber || "";
      this.contactEmail = init.contactEmail || "";
      this.website = init.website || "";
      this.preferredLocations = init.preferredLocations || [];
      this.preferredIndustries = init.preferredIndustries || [];
      this.preferredCompanySizes = init.preferredCompanySizes || [];
      this.preferredLocationsWeight = init.preferredLocationsWeight || StudentModel.PREFERRED_LOCATIONS_WEIGHT;
      this.preferredIndustriesWeight = init.preferredIndustriesWeight || StudentModel.PREFERRED_INDUSTRIES_WEIGHT;
      this.preferredCompanySizeWeight = init.preferredCompanySizeWeight || StudentModel.PREFERRED_COMPANY_SIZE_WEIGHT; 
      this.presentationLinks = init.presentationLinks || [];
      this.problemStatements = init.problemStatements || [];
      this.isSetup = init.isSetup || false;
    }
  }

  public updateEducation(educationDetails: StudentEducationModel): void {
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
    this.preferredLocationsWeight = prefs.preferredLocationsWeight;
    this.preferredIndustriesWeight = prefs.preferredIndustriesWeight;
    this.preferredCompanySizeWeight = prefs.preferredCompanySizeWeight; 
  }
}
