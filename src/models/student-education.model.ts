export class StudentEducationModel {
  public school: any = null;
  public major: any = null;
  public gpa: number = null;
  public graduationDate: string = "";

  constructor(init?: any) {
    if (init) {
      this.school = init.school || null;
      this.major = init.major || null;
      this.gpa = init.gpa || null;
      this.graduationDate = init.graduationDate || "";
    }
  }
}
