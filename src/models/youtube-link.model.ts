import { Platform } from 'ionic-angular';
import { PresentationLinkModel } from './presentation-link.model';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { CordovaCheck } from '@ionic-native/core';

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

  /*
    Generate the actual link to be stored in the database from the field values for this type.
  */
  generateLink(fields) {
    let ytUrl = "https://www.youtube.com/watch?v=";
    let ytEmbedUrl = "https://www.youtube.com/embed/";
    let videoId = fields[0].value;

    return ytUrl + videoId;
  }

  /*
    Returns boolean whether the given string matches this type of link.
  */
  matchLink(link: PresentationLinkModel) {
    return link.link.includes("youtube");
  }

  /*
    Convert the given presentation link to this type.
  */
  convertLink(link: PresentationLinkModel) {
    return new YouTubeLinkModel(link);
  }

  /*
    Get the HTML template to use when displaying this type of link.
  */
  getDisplayTemplate() {
    return `
      <div class="yt-display fake-link">
        <i class="yt-overlay-icon">&#9658;</i>
        <div class="yt-overlay-fade"></div>
        <img src="https://img.youtube.com/vi/${this.getVideoId()}/0.jpg" width="100%" height="200px">
      </div>
    `;
  }

  /*
    Handle the "opening" of this link type.
  */
  openLink(isApp) {
    if (isApp) {
      let ytPlayer = new YoutubeVideoPlayer();
      ytPlayer.openVideo(String(this.getVideoId));
    }
    else {
      super.openLink(isApp);
    }
  }

  /*
    Get this youtube video's id from the url.
  */
  getVideoId() {
    return this.link.substring(this.link.lastIndexOf("=") + 1);
  }
}
