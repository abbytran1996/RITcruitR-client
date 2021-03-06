import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { OnetWebService } from 'services/Onet.js';

import { ApiService } from './api.service';

@Injectable()
export class DataService {
    constructor(
        private apiService: ApiService
    ) {}

    public isApp = true;

    //=========================================================================
    // * GET LOCATIONS                                                        *
    //=========================================================================
    // - Returns the structured list of locatiions
    // - Returns a list of locations (there's no model because it's simple):
    //   ex. [{"id": 1, "name": "Buffalo, NY"}, {...}]
    getLocations() {
      return [
        'Buffalo, NY',
        'Rochester, NY',
        'New York City, NY',
        'San Jose, CA',
        'San Francisco, CA',
        'Seattle, WA'
      ];
    }

    //=========================================================================
    // * GET INDUSTRIES                                                       *
    //=========================================================================
    // - Returns the structured list of industries
    // - Returns a list of industries (there's no model because it's simple):
    //   ex. [{"id": 1, "name": "Medical"}, {...}]
    getIndustries() {
      return this.apiService.get("/industries");
    }

    //=========================================================================
    // * GET UNIVERSITIES                                                     *
    //=========================================================================
    // - Returns the structured list of universities
    // - Returns a list of universities (there's no model because it's simple):
    //   ex. [{"id": 1, "name": "Rochester Institute of Technology"}, {...}]
    getUniversities() {
      return this.apiService.get("/universities");
    }

    //=========================================================================
    // * GET MAJORS                                                           *
    //=========================================================================
    // - Returns the structured list of majors
    // - Returns a list of majors (there's no model because it's simple):
    //   ex. [{"id": 1, "name": "Software Engineering"}, {...}]
    getMajors() {
      return this.apiService.get("/majors");
    }

    //=========================================================================
    // * GET ALL                                                        *
    //=========================================================================
    // - Returns the structured list of 
    // - Returns a list of  (there's no skill model because it's simple):
    //   ex. [{"id": 1, "name": "Experience Design"}, {...}]
    // - NOTE: Sending majors to get  is currently 'NYI'
    getSkills(major = "") {
      let params = new HttpParams();
      return this.apiService.get('/skills', params);
    }

    //=========================================================================
    // * GET COMPANY SIZES FOR STUDENT                                        *
    //=========================================================================
    // - Returns the structured list of company sizes for student preference
    getCompanySizesForStudent() {
      return [
        { text: "Startup (< 100)", value: "STARTUP" },
        { text: "Small (100-300)", value: "SMALL" },
        { text: "Medium (301-500)", value: "MEDIUM" },
        { text: "Large (501-1000)", value: "LARGE" },
        { text: "Huge (> 1000)", value: "HUGE" }
      ];
    }

    //=========================================================================
    // * GET COMPANY SIZES FOR COMPANY                                        *
    //=========================================================================
    // - Returns the structured list of company sizes for company registration
    getCompanySizesForCompany() {
      return [
        { text: "Startup (< 100)", value: "STARTUP" },
        { text: "Small (100-300)", value: "SMALL" },
        { text: "Medium (301-500)", value: "MEDIUM" },
        { text: "Large (501-1000)", value: "LARGE" },
        { text: "Huge (> 1000)", value: "HUGE" }
      ];
    }
}
