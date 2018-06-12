export class StudentJobPreferencesModel {
  public preferredLocations: any = [];
  public preferredIndustries: any = [];
  public preferredCompanySizes: any = [];

  constructor(init?: any) {
    if (init) {
      this.preferredLocations = init.preferredLocations || [];
      this.preferredIndustries = init.preferredIndustries || [];
      this.preferredCompanySizes = init.preferredCompanySizes || [];
    }
  }
}
