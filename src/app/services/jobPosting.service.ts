import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class JobPostingService {
    constructor(
        private apiService: ApiService,
        private http: HttpClient
    ) { }

    createJobPosting(jobPosting) {
        return this.apiService.post('/jobposting/create', jobPosting)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    deleteJobPosting(jobPosting) {
        return this.apiService.delete('/jobposting/delete/' + jobPosting.id)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    getJobPostingById(id) {
        return this.apiService.get('/jobposting/' + id)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    getJobPostingsByRecruiter(recruiter) {
        return this.apiService.get('/jobposting/recruiter/' + recruiter.id)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    getProbPhasePosts(jobPosting) {
        return this.apiService.get('/matches/posting/' + jobPosting.id + '/probphase')
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