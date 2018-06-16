export class RecruiterContactModel {
  public contactEmail: string = "";
  public phoneNumber: string = "";

  constructor(init?: any) {
    if (init) {
      this.contactEmail = init.contactEmail || "";
      this.phoneNumber = init.phoneNumber || "";
    }
  }
}
