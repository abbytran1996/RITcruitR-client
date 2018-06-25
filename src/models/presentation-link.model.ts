export class PresentationLinkModel {
  public id: number = null;
  public title: string = "";
  public link: string = "";

  constructor(init?: any) {
    if (init) {
      this.id = init.id || null;
      this.title = init.title || "";
      this.link = init.link || "";
    }
  }
}
