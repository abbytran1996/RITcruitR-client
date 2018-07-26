import { PresentationLinkModel } from './presentation-link.model';

export class YouTubeLinkModel extends PresentationLinkModel {

  constructor(init?: any) {
    super(init);

    this.optionText = "YouTube Video";
    this.optionValue = "youtube";
    this.pageTitle = "YouTube";
    this.icon = "logo-youtube";
    this.color = "#eb3324";
    this.fields = [
      { type: "text", label: "VIDEO ID", name: "videoID", value: "", required: true }
    ];
  }

  generateLink(fields) {
    let ytUrl = "https://www.youtube.com/watch?v=";
    let videoId = fields[0].value;

    return ytUrl + videoId;
  }
}
