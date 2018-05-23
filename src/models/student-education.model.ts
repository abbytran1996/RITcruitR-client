export class StudentEducationModel {
  public school: string = "";
  public major: string = "";
  public gpa: number = null;
  public graduationDate: string = "";

  constructor(init?: any) {
    if (init) {
      this.school = init.school || "";
      this.major = init.major || "";
      this.gpa = init.gpa || null;
      this.graduationDate = init.graduationDate || "";
    }
  }
}
