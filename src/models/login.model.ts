export class LoginModel {
  public username: string = "";
  public password: string = "";

  constructor(init?: any) {
    if (init) {
      this.username = init.username || "";
      this.password = init.password || "";
    }
  }
}
