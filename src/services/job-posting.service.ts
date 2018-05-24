import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class JobPostingService {
    constructor(
        private apiService: ApiService
    ) { }

    //=========================================================================
    // * GET JOB BY ID                                                        *
    //=========================================================================
    // - Given a job id, returns the associated job
    // - Expects a job id number
    // - Returns a JobModel
    getJobById(id) {
      return this.apiService.get('/jobposting/' + id);
    }

    //=========================================================================
    // * GET JOBS BY COMPANY                                                  *
    //=========================================================================
    // - Given a company id, returns all jobs associated with that company
    // - Expects a company id number
    // - Returns a list of JobModels
    getJobsByCompany(companyId) {
      return this.apiService.get('/jobposting/company/' + companyId);
    }

    //=========================================================================
    // * GET OPEN JOBS BY COMPANY                                             *
    //=========================================================================
    // - Given a company id, returns all open jobs associated with that
    //   company. Open jobs are ones that are active, and have not been filled.
    // - Expects a company id number
    // - Returns a list of JobModels
    getOpenJobsByCompany(companyId) {
      return this.apiService.get('/jobposting/company/' + companyId + '/open');
    }

    //=========================================================================
    // * GET FULFILLED JOBS BY COMPANY                                        *
    //=========================================================================
    // - Given a company id, returns all fulfilled jobs associated with that
    //   company. Fulfilled jobs are ones that have been filled by a student.
    //   They are inactive and shouldn't be used in matching.
    // - Expects a company id number
    // - Returns a list of JobModels
    getFulfilledJobsByCompany(companyId) {
      return this.apiService.get('/jobposting/company/' + companyId + '/fulfilled');
    }

    //=========================================================================
    // * GET DELETED JOBS BY COMPANY                                          *
    //=========================================================================
    // - Given a company id, returns all deleted jobs associated with that
    //   company. Deleted jobs are ones that are completely inactive and not
    //   used in any context in the system, but aren't fully "deleted".
    // - Expects a company id number
    // - Returns a list of JobModels
    getDeletedJobsByCompany(companyId) {
      return this.apiService.get('/jobposting/company/' + companyId + '/deleted');
    }

    //=========================================================================
    // * GET JOBS BY RECRUITER                                                *
    //=========================================================================
    // - Given a recruiter id, returns all jobs associated with that recruiter
    // - Expects a recruiter id number
    // - Returns a list of JobModels
    getJobsByRecruiter(recruiterId) {
      return this.apiService.get('/jobposting/recruiter/' + recruiterId);
    }

    //=========================================================================
    // * ADD JOB                                                              *
    //=========================================================================
    // - Creates a new job
    // - Expects a company id number and a NewJobModel
    // - Returns a JobModel
    addJob(companyId, job) {
        return this.apiService.post('/jobposting/' + companyId, job);
    }

    //=========================================================================
    // * UPDATE JOB                                                           *
    //=========================================================================
    // - Updates a job
    // - Expects a JobModel
    // - Returns 200 (OK) response
    updateJob(job) {
        return this.apiService.put('/jobposting/' + job.id, job);
    }

    //=========================================================================
    // * DELETE JOB                                                           *
    //=========================================================================
    // - Deletes a job by setting its status to DELETED
    // - Expects a job id number
    // - Returns 200 (OK) response
    deleteJob(jobId) {
        return this.apiService.delete('/jobposting/' + jobId);
    }

    //=========================================================================
    // * FULFILL JOB                                                          *
    //=========================================================================
    // - Sets a job's status to FULFILLED
    // - Expects a job id number
    // - Returns 200 (OK) response
    fulfillJob(jobId) {
        return this.apiService.post('/jobposting/' + jobId + 'fulfill');
    }
}
