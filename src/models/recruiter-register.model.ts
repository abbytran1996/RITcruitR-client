export class RecruiterRegisterModel {
  constructor(
    public email: string,
    public password: string,
    public passwordConfirm: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public contactEmail: string
  ) {}
}
