import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';

@Injectable()
export class DataService {
    constructor(
        private apiService: ApiService
    ) {}

    public isApp = true;

    // TODO: Update this to pull real structured data from the API
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

    // TODO: Update this to pull real structured data from the API
    getIndustries() {
      return [
        'Medical',
        'Food Service',
        'Banking',
        'Hardware',
        'Financial',
        'Social Network'
      ];
    }

    // TODO: Update this to pull real structured data from the API
    // NOTE: The temp lists were added back directly into the functions
    //       to fix a bug on mobile devices that prevented the list
    //       from working properly. Remove after todo above is done
    getCompanySizesForStudent() {
      return [
        { text: "No Preference", id: 0 },
        { text: "Startup (< 100)", id: 1 },
        { text: "Small (100-300)", id: 2 },
        { text: "Medium (301-500)", id: 3 },
        { text: "Large (501-1000)", id: 4 },
        { text: "Huge (> 1000)", id: 5 }
      ];
    }

    // TODO: Update this to pull real structured data from the API
    // NOTE: The temp lists were added back directly into the functions
    //       to fix a bug on mobile devices that prevented the list
    //       from working properly. Remove after todo above is done
    getCompanySizesForCompany() {
      return [
        { text: "Startup (< 100)", id: 1 },
        { text: "Small (100-300)", id: 2 },
        { text: "Medium (301-500)", id: 3 },
        { text: "Large (501-1000)", id: 4 },
        { text: "Huge (> 1000)", id: 5 }
      ];
    }

    //=========================================================================
    // * GET ALL SKILLS                                                       *
    //=========================================================================
    // - Returns the structured list of skills
    // - Returns a list of skills (there's no skill model because it's simple):
    //   ex. [{"id": 1, "name": "Experience Design"}, {...}]
    getSkills(major="") {
      let params = new HttpParams();
      if(major){ params.append("major", major); }
      return this.apiService.get('/skills', params);
    }
}
