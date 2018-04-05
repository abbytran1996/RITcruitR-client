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
    ) { }

    getLocations() {
      return [
        'Buffalo, New York', 'Rochester, New York', 'New York City, New York', 'San Jose, California', 'Seattle, Washington'
      ];
    }

    getIndustries() {
      return [
        'Medical', 'Food Service', 'Banking', 'Hardware', 'Financial'
      ];
    }

    getCompanySizes() {
      return [
        {text: "No Preference", id: 0},
        {text: "Startup (1-10)", id: 1},
        {text: "Small (11-20)", id: 2},
        {text: "Medium (21-40)", id: 3},
        {text: "Large (41-100)", id: 4},
        {text: "Huge (101-500)", id: 5}
      ];
    }
}
