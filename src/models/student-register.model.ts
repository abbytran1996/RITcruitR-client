export class StudentRegisterModel {
  constructor(
    public email: string,
    public password: string,
    public passwordConfirm: string,
    public firstName: string,
    public lastName: string
  ) {}
}
