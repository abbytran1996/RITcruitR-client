export class ProblemStatementModel {
  public id: number = null;
  public title: string = "";
  public text: string = "";

  constructor(init?: any) {
    if (init) {
      this.id = init.id || null;
      this.title = init.title || "";
      this.text = init.text || "";
    }
  }
}
