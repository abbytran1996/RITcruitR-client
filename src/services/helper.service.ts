import { Injectable } from '@angular/core';

import {
  PresentationLinkModel,
  PresentationLinkDBModel,
  YouTubeLinkModel,
  GitHubLinkModel
} from '@app/models';

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
  // - Expects an array of objects, and the object to remove
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

  //=========================================================================
  // * GET PRESENTATION LINK TYPES                                                  
  //=========================================================================
  // - Returns an array with each of the possible presentation link types.
  //   Each object in the array is an instance of the link type class and
  //   contains its own config values needed throughout the app.
  //
  // - NOTE: When adding new link types, be sure to add an instance of the
  //   new class here and everything will work.
  getPresentationLinkTypes() {
    return [
      new PresentationLinkModel(),
      new YouTubeLinkModel(),
      new GitHubLinkModel()
    ];
  }

  //=========================================================================
  // * CONVERT LINK TYPES                                                  
  //=========================================================================
  // - Takes in an array of presentation links, determines the type of each
  //   link, and converts that link to the proper link class for its type.
  //   For instance, a YouTube link coming from the database won't initially
  //   be of type YouTubeLinkModel, it will just be a generic object.
  //   This function will detect that it is a YouTube link, and convert its
  //   type to YouTubeLinkModel.
  // - Expects an array of PresentationLinkModels
  // - Returns an array of PresentationLinkModels (could be mixed with subclasses)
  convertLinkTypes(links: Array<PresentationLinkModel>) {
    let newArray = [];
    let linkTypes = this.getPresentationLinkTypes();

    links.forEach(linkObj => {
      let typeFound = false;

      linkTypes.forEach(linkType => {
        if (linkType.matchLink(linkObj)) {
          newArray.push(linkType.convertLink(linkObj));
          typeFound = true;
        }
      });

      if (!typeFound) {
        newArray.push(new PresentationLinkModel(linkObj));
      }
    });

    return newArray;
  }

  //=========================================================================
  // * CONVERT SINGLE LINK TYPE                                                  
  //=========================================================================
  // - Takes in a single presentation link, determines its type, and converts
  //   that link to the proper link class for its type.
  //   For instance, a YouTube link coming from the database won't initially
  //   be of type YouTubeLinkModel, it will just be a generic object.
  //   This function will detect that it is a YouTube link, and convert its
  //   type to YouTubeLinkModel.
  // - Expects a PresentationLinkModel
  // - Return a PresentationLinkModels (could be subclass at this point)
  //
  // - NOTE: Uses the above `convertLinkTypes` function to avoid duplicate
  //   logic.
  convertSingleLinkType(link: PresentationLinkModel) {
    let arr = new Array<PresentationLinkModel>();
    arr.push(link);
    return this.convertLinkTypes(arr)[0];
  }

  //=========================================================================
  // * CONVERT LINK TYPES                                                  
  //=========================================================================
  // - Takes in an array of presentation links and converts them to the
  //   database friendly model with no additional fields.
  // - Expects an array of PresentationLinkModels
  // - Returns an array of PresentationLinkDBModels
  convertLinksForDB(links: Array<PresentationLinkModel>) {
    let newArray = [];

    links.forEach(linkObj => {
      newArray.push(new PresentationLinkDBModel(linkObj));
    });

    return newArray;
  }

  // * SORT MATCHES                                                  
  //=========================================================================
  // - Sort the given array of matches first by numDaysRemaining, and
  //   then by matchStrength
  sortMatches(matchArray) {
    return matchArray.sort((a, b) => {
      // If numDaysRemaining is greater, put that first, if equal, put higher matchStrength first
      return a.job.numDaysRemaining - b.job.numDaysRemaining || b.matchStrength - a.matchStrength;
    });
  }

  //=========================================================================
  // * SORT JOBS                                                  
  //=========================================================================
  // - Sort the given array of jobs first by numDaysRemaining
  sortJobs(jobsArray) {
    return jobsArray.sort((a, b) => {
      return a.numDaysRemaining - b.numDaysRemaining;
    });
  }

  //=========================================================================
  // * IS MATCH HEADER LARGE                                                  
  //=========================================================================
  // - Determines if the match card header for the given match should be
  //   the large variety or not based on the length of a certain string
  //   determined by the useValue parameter. If non is specified, the]
  //   job's positionTitle will be used
  isMatchHeaderLarge(match, useField?) {
    var charLimit = 20;

    if (useField == undefined) return (match.job.positionTitle.length >= charLimit);

    switch (useField) {
      case "studentName":
        let studentName = match.student.firstName + " " + match.student.lastName;
        return (studentName.length >= charLimit);
      
      case "companyName":
        let companyName = match.job.company.companyName;
        return (companyName.length >= charLimit);

      default:
        return false;
    }
  }

  //=========================================================================
  // * IS MATCH TOOLBAR LARGE                                                  
  //=========================================================================
  // - Determines if the match toolbar for the given match should be
  //   the large variety or not based on the length of the positionTitle
  isMatchToolbarLarge(match, useStudentName?) {
    return (match.job.positionTitle.length >= 24);
  }

  //=========================================================================
  // * VALIDATE PASSWORD                                                  
  //=========================================================================
  // - Determines if the given string password is valid based on the app's
  //   password requirements.
  // - Must be at least 8 characters long.
  validatePassword(password) {
    let message = "Password must be at least 8 characters long.";
    return password.length >= 8 || message;
  }
}