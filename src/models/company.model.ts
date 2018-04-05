export class CompanyModel {
  constructor(
    public id: any,
    public companyName: string,
    public location: any,
    public industry: any,
    public size: number,
    public approvalStatus: boolean,
    public presentation: string,
    public companyDescription: string,
    public websiteURL: string,
    public emailSuffix: string,
    public userId: number
  ) {
  }

  public static createCompanyFromApiData(apiData: any): CompanyModel {
    return new CompanyModel(
      apiData.id,
      apiData.companyName,
      apiData.location,
      apiData.industry,
      apiData.size,
      apiData.approvalStatus,
      apiData.presentation,
      apiData.companyDescription,
      apiData.websiteURL,
      apiData.emailSuffix,
      apiData.userId
    );
  }
}
