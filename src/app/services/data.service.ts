import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class DataService {
    constructor(
        private apiService: ApiService,
        private http: HttpClient
    ) {}

    // TODO: Update this to pull real structured data from the API
    getLocations() {
      return [
        'Buffalo, New York',
        'Rochester, New York',
        'New York City, New York',
        'San Jose, California',
        'Seattle, Washington'
      ];
    }

    // TODO: Update this to pull real structured data from the API
    getIndustries() {
      return [
        'Medical',
        'Food Service',
        'Banking',
        'Hardware',
        'Financial'
      ];
    }

    // TODO: Update this to pull real structured data from the API
    getCompanySizesForStudent() {
      return [
        {text: "No Preference", id: 0},
        {text: "Startup (1-10)", id: 1},
        {text: "Small (11-20)", id: 2},
        {text: "Medium (21-40)", id: 3},
        {text: "Large (41-100)", id: 4},
        {text: "Huge (101-500)", id: 5}
      ];
    }

    // TODO: Update this to pull real structured data from the API
    getCompanySizesForCompany() {
      return [
        {text: "Startup (1-10)", id: 1},
        {text: "Small (11-20)", id: 2},
        {text: "Medium (21-40)", id: 3},
        {text: "Large (41-100)", id: 4},
        {text: "Huge (101-500)", id: 5}
      ];
    }

    //=========================================================================
    // * GET ALL SKILLS                                                       *
    //=========================================================================
    // - Returns the structured list of skills
    // - Returns a list of skills (there's no skill model because it's simple):
    //   ex. [{"id": 1, "name": "Experience Design"}, {...}]
    getSkills() {
      return this.apiService.get('/skills');
    }
}
