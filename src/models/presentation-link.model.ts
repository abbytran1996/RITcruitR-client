export class PresentationLinkModel {
  public id: number = null;
  public title: string = "";
  public link: string = "";

  // Values for adding and handling presentation links, not saved in DB
  public optionText: string = "";
  public optionValue: string = "";
  public pageTitle: string = "";
  public icon: string = "";
  public color: string = "";
  public fields: any = [];

  constructor(init?: any) {
    if (init) {
      this.id = init.id || null;
      this.title = init.title || "";
      this.link = init.link || "";
    }

    this.optionText = "Basic Link";
    this.optionValue = "basic";
    this.pageTitle = "Basic Link";
    this.icon = "md-link";
    this.color = "#424242";
    this.fields = [
      { type: "text", label: "LINK URL", name: "linkUrl", value: "", required: true }
    ];
  }

  generateLink(fields) {
    let regex = new RegExp("^(https?|ftp)://.*$");
    let newLink = String(fields[0].value);

    if (!regex.test(newLink)) {
      newLink = "http://" + newLink;
    }

    return newLink;
  }
}
