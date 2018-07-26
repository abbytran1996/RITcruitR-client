import { Injectable } from '@angular/core';

import { PresentationLinkModel } from '@app/models';
import { YouTubeLinkModel } from '@app/models';

@Injectable()
export class HelperService {
  constructor() { }

  //=========================================================================
  // * GET CARD FADE TIME                                                 
  //=========================================================================
  // - Get the value of the time to fade a card out during animation
  // - Stored here as a global constant
  getCardFadeTime() {
    return 400;
  }

  //=========================================================================
  // * GET TEXT EDITOR SETTINGS                                                 
  //=========================================================================
  // - Returns the config used for all of the WYSIWYG editors
  getTextEditorSettings() {
    return {
      toolbarButtons: ['bold', 'italic', '|', 'undo', 'redo'],
      quickInsertButtons: [],
      quickInsertTags: [],
      charCounterCount: false
    };
  }

  //=========================================================================
  // * SORT BY ID                                                  
  //=========================================================================
  // - Sort the given array by an id field
  // - Expects an array of objects with a field called "id" and a boolean
  //   specifying if the array should be sorted in ascending order
  // - Returns the same array sorted in the desired manner
  sortById(array, ascending = false) {
    return array.sort((a, b) => {
      if (a.id < b.id)
        return (ascending) ? -1 : 1;
      if (a.id > b.id)
        return (ascending) ? 1 : -1;
      return 0;
    });
  }

  //=========================================================================
  // * REMOVE FROM ARRAY BY ID                                                  
  //=========================================================================
  // - Remove the given object from the given array, matching by id
  // - Returns the array
  removeFromArrayById(array, obj) {
    let index = 0;
    let indexToRemove = -1;
    array.forEach(objInArr => {
      if (objInArr.id == obj.id) {
        indexToRemove = index;
      }

      index++;
    });

    if (indexToRemove > -1) {
      array.splice(indexToRemove, 1);
    }

    return array;
  }

  getPresentationLinksConfig() {
    // return [
    //   {
    //     optionText: "Basic Link",
    //     optionValue: "basic",
    //     pageTitle: "Basic Link",
    //     icon: "md-link",
    //     color: "#424242",
    //     fields: [
    //       { type: "text", label: "LINK URL", name: "linkUrl", value: "", required: true }
    //     ],
    //     generateLink: (fields) => {
    //       let regex = new RegExp("^(https?|ftp)://.*$");
    //       let link = String(fields[0].value);

    //       if (!regex.test(link)) {
    //         link = "http://" + link;
    //       }

    //       return link;
    //     }
    //   },
    //   {
    //     optionText: "YouTube Video",
    //     optionValue: "youtube",
    //     pageTitle: "YouTube",
    //     icon: "logo-youtube",
    //     color: "#eb3324",
    //     fields: [
    //       { type: "text", label: "VIDEO ID", name: "videoID", value: "", required: true }
    //     ],
    //     generateLink: (fields) => {
    //       let ytUrl = "https://www.youtube.com/watch?v=";
    //       let videoId = fields[0].value;

    //       return ytUrl + videoId;
    //     }
    //   },
    //   {
    //     optionText: "GitHub",
    //     optionValue: "github",
    //     pageTitle: "GitHub",
    //     icon: "logo-github",
    //     color: "#000000",
    //     fields: [
    //       { type: "text", label: "GITHUB USERNAME", name: "githubUsername", value: "", required: true },
    //       { type: "text", label: "GITHUB REPOSITORY NAME (OPTIONAL)", name: "githubRepo", value: "", required: false }
    //     ],
    //     generateLink: (fields) => {
    //       let ghUrl = "https://github.com/";
    //       let username = fields[0].value;
    //       let repo = fields[1].value;

    //       return ghUrl + username + "/" + repo;
    //     }
    //   }
    // ];

    return [
      new PresentationLinkModel(),
      new YouTubeLinkModel()
    ];
  }
}