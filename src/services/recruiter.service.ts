import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class RecruiterService {
    constructor(
        private apiService: ApiService
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
    // * GET RECRUITERS BY COMPANY                                            *
    //=========================================================================
    // - Given a company id, returns a list of recruiters
    // - Expects a company id number
    // - Returns a list of RecruiterModels
    getRecruitersByCompany(companyId) {
        return this.apiService.get('/recruiters/company/' + companyId);
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

    //=========================================================================
    // * DELETE RECRUITER                                                     *
    //=========================================================================
    // - Deletes a recruiter with the given id
    // - Expects a RecruiterModel id number
    // - Returns 200 (OK) response
    deleteRecruiter(recruiterId) {
        return this.apiService.delete('/recruiters/' + recruiterId);
    }

    //=========================================================================
    // * MAKE PRIMARY RECRUITER                                               *
    //=========================================================================
    // - Makes the recruiter with the given id the primary recruiter.
    // - Expects a RecruiterModel id number
    // - Returns 200 (OK) response
    makePrimaryRecruiter(recruiterId) {
        return this.apiService.put('/recruiters/' + recruiterId + "/primary");
    }

    //=========================================================================
    // * REVOKE PRIMARY RECRUITER                                             *
    //=========================================================================
    // - Revokes the status of primary from the recruiter with the given id
    // - Expects a RecruiterModel id number
    // - Returns 200 (OK) response
    revokePrimaryRecruiter(recruiterId) {
        return this.apiService.delete('/recruiters/' + recruiterId + "/primary");
    }
}
