export class CompanyModel {
  constructor(
    public id: any,
    public companyName: string,
    public locations: any,
    public industries: any,
    public size: number,
    public approvalStatus: boolean,
    public presentation: string,
    public companyDescription: string,
    public websiteURL: string,
    public emailSuffix: string,
    public userId: number,
    public presentationLinks: any
  ) {}

  public static createCompanyFromApiData(apiData: any): CompanyModel {
    return new CompanyModel(
      apiData.id,
      apiData.companyName,
      apiData.locations,
      apiData.industries,
      apiData.size,
      apiData.approvalStatus,
      apiData.presentation,
      apiData.companyDescription,
      apiData.websiteURL,
      apiData.emailSuffix,
      apiData.userId,
      (apiData.presentationLinks) ? apiData.presentationLinks : []
    );
  }
}
