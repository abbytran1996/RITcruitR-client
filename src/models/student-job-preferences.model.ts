export class StudentJobPreferencesModel {
  public preferredLocations: any = [];
  public preferredIndustries: any = [];
  public preferredCompanySizes: any = [];
  public preferredLocationsWeight: number = 0.4;
  public preferredIndustriesWeight: number = 0.3;
  public preferredCompanySizeWeight: number = 0.2; 

  constructor(init?: any) {
    if (init) {
      this.preferredLocations = init.preferredLocations || [];
      this.preferredIndustries = init.preferredIndustries || [];
      this.preferredCompanySizes = init.preferredCompanySizes || [];
      this.preferredLocationsWeight = init.preferredLocationsWeight || 0.4;
      this.preferredIndustriesWeight = init.preferredIndustriesWeight || 0.3;
      this.preferredCompanySizeWeight = init.preferredCompanySizeWeight || 0.2; 
    }
  }
}
