import { PresentationLinkModel } from './presentation-link.model';

export class GitHubLinkModel extends PresentationLinkModel {

  constructor(init?: any) {
    super(init);

    this.optionText = "GitHub";
    this.optionValue = "github";
    this.pageTitle = "GitHub";
    this.icon = "logo-github";
    this.color = "#000000";
    this.fields = [
      { type: "text", label: "GITHUB USERNAME", name: "githubUsername", value: "", required: true },
      { type: "text", label: "GITHUB REPOSITORY NAME (OPTIONAL)", name: "githubRepo", value: "", required: false }
    ];
  }

  /*
    Generate the actual link to be stored in the database from the field values for this type.
  */
  generateLink(fields) {
    let ghUrl = "https://github.com/";
    let username = fields[0].value;
    let repo = fields[1].value || "";

    return ghUrl + username + "/" + repo;
  }

  /*
    Returns boolean whether the given string matches this type of link.
  */
  matchLink(link: PresentationLinkModel) {
    return link.link.includes("github");
  }

  /*
    Convert the given presentation link to this type.
  */
  convertLink(link: PresentationLinkModel) {
    return new GitHubLinkModel(link);
  }
}
