export class UserModel {
  public id: number = null;
  public username: string = "";
  public roles: any = [];

  constructor(init?: any) {
    if (init) {
      this.id = init.id || null;
      this.username = init.username || "";
      this.roles = init.roles || [];
    }
  }
}
