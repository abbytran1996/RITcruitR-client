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

    //=========================================================================
    // * GET RECRUITER BY ID                                                  *
    //=========================================================================
    // - Given a recruiter id (not a user id), returns the associated recruiter
    // - Expects a recruiter id number
    // - Returns a RecruiterModel
    getRecruiterById(id) {
        return this.apiService.get('/recruiters/' + id);
    }

    //=========================================================================
    // * GET RECRUITER BY EMAIL                                               *
    //=========================================================================
    // - Given a recruiter email, returns the associated recruiter
    // - Expects a recruiter email string
    // - Returns a RecruiterModel
    getRecruiterByEmail(email) {
        return this.apiService.get('/recruiters/byEmail/' + email);
    }

    //=========================================================================
    // * ADD RECRUITER                                                        *
    //=========================================================================
    // - Registers a new recruiter with a company
    // - Expects a company id number, and a RecruiterRegisterModel
    // - Returns a RecruiterModel
    addRecruiter(companyId, recruiter) {
        return this.apiService.post('/company/' + companyId + '/recruiter', recruiter);
    }

    //=========================================================================
    // * UPDATE RECRUITER                                                     *
    //=========================================================================
    // - Updates a recruiter
    // - Expects a RecruiterModel
    // - Returns 200 (OK) response
    updateRecruiter(recruiter) {
        return this.apiService.put('/recruiters/' + recruiter.id, recruiter);
    }
}
