import { InAppBrowser } from '@ionic-native/in-app-browser';

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

  /*
    Generate the actual link to be stored in the database from the field values for this type.
  */
  generateLink(fields) {
    let regex = new RegExp("^(https?)://.*$");
    let newLink = String(fields[0].value);

    if (!regex.test(newLink)) {
      newLink = "http://" + newLink;
    }

    return newLink;
  }

  /*
    Returns boolean whether the given string matches this type of link.
  */
  matchLink(link: PresentationLinkModel) {
    return false; // False for the default, children have implementations
  }

  /*
    Convert the given presentation link to this type.
  */
  convertLink(link: PresentationLinkModel) {
    return link; // For default, jut return itself
  }

  /*
    Get the HTML template to use when displaying this type of link.
  */
  getDisplayTemplate() {
    return `
      <p class="fg-dark fake-link">${this.link}</p>
    `;
  }

  /*
    Handle the "opening" of this link type.
  */
  openLink(isApp) {
    let browse = new InAppBrowser();
    if (browse) browse.create(this.link);
    else window.open(this.link, '_system', 'location=yes');
  }
}
