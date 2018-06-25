import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
  constructor() { }

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
}