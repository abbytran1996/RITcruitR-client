import { Injectable } from '@angular/core';

import {
  JobModel
} from '@app/models';

import { ApiService } from './api.service';

@Injectable()
export class JobPostingService {
    constructor(
        private apiService: ApiService
    ) { }

    public currentJob: JobModel;

    //=========================================================================
    // * GET CURRENT JOB                                                      *
    //=========================================================================
    // - Gets the job that is currently being "viewed" (seeing matches).
    //   This is used by the company phases screens to have a global
    //   reference to the job to avoid passing it back and forth.
    // - Returns a JobModel
    getCurrentJob() {
      return this.currentJob;
    }

    //=========================================================================
    // * SET CURRENT JOB                                                      *
    //=========================================================================
    // - Sets the job that is currently being "viewed" (seeing matches).
    //   This is used by the company phases screens to have a global
    //   reference to the job to avoid passing it back and forth.
    // - Expects a JobModel
    setCurrentJob(job: JobModel) {
      this.currentJob = job;
    }

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
    // * GET ACTIVE JOBS BY COMPANY                                           *
    //=========================================================================
    // - Given a company id, returns all active jobs associated with that
    //   company.
    // - Expects a company id number
    // - Returns a list of JobModels
    getActiveJobsByCompany(companyId) {
      return this.apiService.get('/jobposting/company/' + companyId + '/status/active');
    }

    //=========================================================================
    // * GET INACTIVE JOBS BY COMPANY                                         *
    //=========================================================================
    // - Given a company id, returns all inactive jobs associated with that
    //   company.
    // - Expects a company id number
    // - Returns a list of JobModels
    getInactiveJobsByCompany(companyId) {
      return this.apiService.get('/jobposting/company/' + companyId + '/status/inactive');
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

    //=========================================================================
    // * DEACTIVATE JOB                                                       *
    //=========================================================================
    // - Given a job id, deactivates the job associated with that id
    // - Expects a job id number
    // - Returns 200 (OK) response
    deactivateJob(jobId) {
      return this.apiService.patch('/jobposting/' + jobId + '/status/inactive');
    }

    //=========================================================================
    // * REACTIVATE JOB                                                       *
    //=========================================================================
    // - Given a job id, reactivates the job associated with that id
    // - Expects a job id number
    // - Returns 200 (OK) response
    reactivateJob(jobId) {
      return this.apiService.patch('/jobposting/' + jobId + '/status/active');
    }

    //=========================================================================
    // * GET PROBLEM PHASE MATCHES BY JOB                                     *
    //=========================================================================
    // - Returns a list of matches in the recruiter problem phase by the
    //   given job id.
    // - Expects a job id number
    // - Returns a list of MatchModels
    getProblemPhaseMatchesByJob(jobId) {
      return this.apiService.get('/matches/posting/' + jobId + '?phase=problem');
    }

    //=========================================================================
    // * GET PRESENTATION PHASE MATCHES BY JOB                                *
    //=========================================================================
    // - Returns a list of matches in the recruiter presentation phase by the
    //   given job id.
    // - Expects a job id number
    // - Returns a list of MatchModels
    getPresentationPhaseMatchesByJob(jobId) {
      return this.apiService.get('/matches/posting/' + jobId + '?phase=presentation');
    }

    //=========================================================================
    // * GET FINAL PHASE MATCHES BY JOB                                       *
    //=========================================================================
    // - Returns a list of matches in the final phase by the
    //   given job id.
    // - Expects a job id number
    // - Returns a list of MatchModels
    getFinalPhaseMatchesByJob(jobId) {
      return this.apiService.get('/matches/posting/' + jobId + '?phase=final');
    }

    //=========================================================================
    // * GET ARCHIVED MATCHES BY JOB                                          *
    //=========================================================================
    // - Get all archived matches for the job with the given id
    // - Expects a JobModel id number
    // - Returns an array of MatchModels
    getArchivedMatchesByJob(jobId) {
      return this.apiService.get("/matches/posting/" + jobId + "?phase=archived");
    }

    //=========================================================================
    // * ACCEPT MATCH                                                         *
    //=========================================================================
    // - Accepts a given match
    // - Expects a Match id number
    // - Returns 200 (OK) response
    acceptMatch(matchId) {
        return this.apiService.patch('/matches/' + matchId + "/approve");
    }

    //=========================================================================
    // * DECLINE MATCH                                                        *
    //=========================================================================
    // - Declines a given match
    // - Expects a Match id number
    // - Returns 200 (OK) response
    declineMatch(matchId) {
        return this.apiService.patch('/matches/' + matchId + "/decline");
    }

    //=========================================================================
    // * ARCHIVE MATCH                                                        *
    //=========================================================================
    // - Archive a match with the given id
    // - Expects a MatchModel id number
    // - Returns 200 (OK) response
    archiveMatch(matchId) {
        return this.apiService.patch("/matches/" + matchId + "/archive");
    }

    //=========================================================================
    // * GET NUM PHASE 1 MATCHES                                              *
    //=========================================================================
    // - Gets the number matches the job with the given id has in the
    //   problem phase
    // - Expects a JobModel id number
    // - Returns the number of matches in that phase
    getNumPhase1Matches(jobId) {
        return this.apiService.get("/matches/posting/" + jobId + "/count?phase=problem");
    }

    //=========================================================================
    // * GET NUM PHASE 2 MATCHES                                              *
    //=========================================================================
    // - Gets the number matches the job with the given id has in the
    //   presentation phase
    // - Expects a JobModel id number
    // - Returns the number of matches in that phase
    getNumPhase2Matches(jobId) {
        return this.apiService.get("/matches/posting/" + jobId + "/count?phase=presentation");
    }

    //=========================================================================
    // * GET NUM FINAL MATCHES                                                *
    //=========================================================================
    // - Gets the number matches the job with the given id has in the
    //   final phase
    // - Expects a JobModel id number
    // - Returns the number of matches in that phase
    getNumFinalMatches(jobId) {
        return this.apiService.get("/matches/posting/" + jobId + "/count?phase=final");
    }

    //=========================================================================
    // * GET NUM ALL MATCHES                                                  *
    //=========================================================================
    // - Gets the number matches the job with the given id has in all phases
    getNumAllMatches(jobId) {
      return this.apiService.get("/matches/posting/" + jobId + "/count");
    }
}
