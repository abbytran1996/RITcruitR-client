export class StudentRegisterModel {
  public email: string = "";
  public password: string = "";
  public passwordConfirm: string = "";
  public firstName: string = "";
  public lastName: string = "";
  
  constructor(init?: any) {
    if (init) {
      this.email = init.email || "";
      this.password = init.password || "";
      this.passwordConfirm = init.passwordConfirm || "";
      this.firstName = init.firstName || "";
      this.lastName = init.lastName || "";
    }
  }
}
