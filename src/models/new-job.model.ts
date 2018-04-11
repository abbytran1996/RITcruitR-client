export class NewJobModel {
  constructor(
    public status: number,
    public positionTitle: string,
    public description: string,
    public locations: any,
    public requiredSkills: any,
    public niceToHaveSkills: any,
    public niceToHaveSkillsWeight: number,
    public minGpa: number,
    public hasWorkExperience: boolean,
    public matchThreshold: number,
    public duration: number,
    public problemStatement: string,
    public video: string,
    public recruiterId: number,
    public newVideo: string
  ) {}

  public static createNewJobModel(): NewJobModel {
    return new NewJobModel(
      0,
      "",
      "",
      [],
      [],
      [],
      0,
      null,
      false,
      50,
      null,
      "",
      "",
      0,
      ""
    );
  }
}
