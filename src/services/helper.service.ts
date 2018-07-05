import { Injectable } from '@angular/core';

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
}