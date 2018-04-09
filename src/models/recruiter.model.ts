import { UserModel } from './user.model';
import { CompanyModel } from './company.model';

export class RecruiterModel {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public company: CompanyModel,
    public phoneNumber: string,
    public contactEmail: string,
    public user: UserModel
  ) {}

  public static createRecruiterFromApiData(apiData: any): RecruiterModel {
    return new RecruiterModel(
      apiData.id,
      apiData.firstName,
      apiData.lastName,
      apiData.email,
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
        apiData.company.userId
      ),
      apiData.phoneNumber,
      apiData.contactEmail,
      new UserModel(
        apiData.user.id,
        apiData.user.username,
        apiData.user.roles
      )
    );
  }
}
