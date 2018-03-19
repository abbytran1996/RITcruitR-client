import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class RecruiterService {
    constructor(
        private apiService: ApiService,
        private http: HttpClient
    ) { }

    addRecruiter(recruiter) {
        return this.apiService.post('/recruiters', recruiter)
            .pipe(map(
                data => {

                },
                err => {

                }
            ));
    }

    getRecruiter(email) {
        return this.apiService.get('/recruiters/byEmail/' + email)
            .pipe(map(
                data => {

                },
                err => {

                }
            ));
    }

    updateRecruiter(recruiter) {
        return this.apiService.put('/recruiters/' + recruiter.id, recruiter)
            .pipe(map(
                data => {

                },
                err => {

                }
            ));
    }
}