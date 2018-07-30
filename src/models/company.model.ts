import { PresentationLinkModel } from './presentation-link.model';

export class CompanyModel {
  public id: any = null;
  public companyName: string = "";
  public locations: any = [];
  public industries: any = [];
  public size: number = null;
  public approvalStatus: boolean = false;
  public presentation: string = "";
  public companyDescription: string = "";
  public websiteURL: string = "";
  public emailSuffix: string = "";
  public userId: number = null;
  public presentationLinks: Array<PresentationLinkModel> = [];
  public timeRegistered: any = null;
  public status: number = null;

  constructor(init?: any) {
    if (init) {
      this.id = init.id || null;
      this.companyName = init.companyName || "";
      this.locations = init.locations || [];
      this.industries = init.industries || [];
      this.size = init.size || null;
      this.approvalStatus = init.approvalStatus || false;
      this.presentation = init.presentation || "";
      this.companyDescription = init.companyDescription || "";
      this.websiteURL = init.websiteURL || "";
      this.emailSuffix = init.emailSuffix || "";
      this.userId = init.userId || null;
      this.timeRegistered = init.timeRegistered || null;
      this.presentationLinks = init.presentationLinks || [];
      this.status = init.status || null;
    }
  }
}