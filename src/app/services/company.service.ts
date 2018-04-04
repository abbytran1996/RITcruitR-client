import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class CompanyService {
    constructor(
        private apiService: ApiService,
        private http: HttpClient
    ) { }

    addCompany(company) {
        return this.apiService.post('/company', company);
    }

    getCompanyById(id) {
        return this.apiService.get('/company/' + id);
    }

    getCompanyByEmailSuffix(emailSuffix) {
        return this.apiService.get('/company/email_suffix/' + emailSuffix)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    getCompanyByName(name) {
        return this.apiService.get('/company/company_name/' + name)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    updateCompany(company) {
        return this.apiService.put('/company/' + company.id, company)
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
