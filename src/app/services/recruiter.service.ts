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

    addRecruiter(companyId, recruiter) {
        return this.apiService.post('/company/' + companyId + 'recruiter', recruiter);
    }

    getRecruiterById(id) {
        return this.apiService.get('/recruiters/' + id);
    }

    getRecruiterByEmail(email) {
        return this.apiService.get('/recruiters/byEmail' + email);
    }

    updateRecruiter(recruiter) {
        return this.apiService.put('/recruiters/' + recruiter.id, recruiter)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }
}
