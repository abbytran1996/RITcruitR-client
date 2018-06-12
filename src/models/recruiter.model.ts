import { UserModel } from './user.model';
import { CompanyModel } from './company.model';

export class RecruiterModel {
  public id: number = null;
  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";
  public company: CompanyModel = new CompanyModel();
  public phoneNumber: string = "";
  public contactEmail: string = "";
  public user: UserModel = new UserModel();

  constructor(init?: any) {
    if (init) {
      this.id = init.id || null;
      this.firstName = init.firstName || "";
      this.lastName = init.lastName || "";
      this.email = init.email || "";
      this.company = new CompanyModel(init.company) || new CompanyModel();
      this.phoneNumber = init.phoneNumber || "";
      this.contactEmail = init.contactEmail || "";
      this.user = new UserModel(init.user) || new UserModel();
    }
  }
}
