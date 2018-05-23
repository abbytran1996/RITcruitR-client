export class StudentContactModel {
  public contactEmail: string = "";
  public phoneNumber: string = "";
  public website: string = "";
  
  constructor(init?: any) {
    if (init) {
      this.contactEmail = init.contactEmail || "";
      this.phoneNumber = init.phoneNumber || "";
      this.website = init.website || "";
    }
  }
}
