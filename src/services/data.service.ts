import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

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
    // * GET ALL SKILLS                                                       *
    //=========================================================================
    // - Returns the structured list of skills
    // - Returns a list of skills (there's no skill model because it's simple):
    //   ex. [{"id": 1, "name": "Experience Design"}, {...}]
    // - NOTE: Sending majors to get skills is currently 'NYI'
    getSkills(major = "") {
      let params = new HttpParams();
      if (major) { params.append("major", major); }
      return this.apiService.get('/skills', params);
    }

    //=========================================================================
    // * GET COMPANY SIZES FOR STUDENT                                        *
    //=========================================================================
    // - Returns the structured list of company sizes for student preference
    getCompanySizesForStudent() {
      return [
        { text: "No Preference", id: 0, dbValue: "DONT_CARE" },
        { text: "Startup (< 100)", id: 1, dbValue: "STARTUP" },
        { text: "Small (100-300)", id: 2, dbValue: "SMALL" },
        { text: "Medium (301-500)", id: 3, dbValue: "MEDIUM" },
        { text: "Large (501-1000)", id: 4, dbValue: "LARGE" },
        { text: "Huge (> 1000)", id: 5, dbValue: "HUGE" }
      ];
    }

    //=========================================================================
    // * GET COMPANY SIZES FOR COMPANY                                        *
    //=========================================================================
    // - Returns the structured list of company sizes for company registration
    getCompanySizesForCompany() {
      return [
        { text: "Startup (< 100)", id: 1, dbValue: "STARTUP" },
        { text: "Small (100-300)", id: 2, dbValue: "SMALL" },
        { text: "Medium (301-500)", id: 3, dbValue: "MEDIUM" },
        { text: "Large (501-1000)", id: 4, dbValue: "LARGE" },
        { text: "Huge (> 1000)", id: 5, dbValue: "HUGE" }
      ];
    }
}
