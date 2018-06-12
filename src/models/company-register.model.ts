export class CompanyRegisterModel {
  public companyName: string = "";
  public locations: any = [];
  public industries: any = [];
  public size: number = null;
  public websiteURL: string = "";

  constructor(init?: any) {
    if (init) {
      this.companyName = init.companyName || "";
      this.locations = init.locations || [];
      this.industries = init.industries || [];
      this.size = init.size || null;
      this.websiteURL = init.websiteURL || "";
    }
  }
}
