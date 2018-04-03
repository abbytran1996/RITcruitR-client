export class JobModel {
  constructor(
    public title: string,
    public locations: any,
    public description: string,
    public minGpa: number,
    public hasWorkExperience: boolean,
    public duration: number,
    public problem: string,
    public video: string,
    public videoNew: string
  ) { }
}
