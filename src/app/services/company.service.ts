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

    //=========================================================================
    // * GET COMPANY BY ID                                                    *
    //=========================================================================
    // - Given a company id, returns the associated company
    // - Expects a company id number
    // - Returns a CompanyModel
    getCompanyById(id) {
        return this.apiService.get('/company/' + id);
    }

    //=========================================================================
    // * GET COMPANY BY NAME                                                  *
    //=========================================================================
    // - Given a company name, returns the associated company
    // - Expects a company name string
    // - Returns a CompanyModel
    getCompanyByName(name) {
        return this.apiService.get('/company/company_name/' + name);
    }

    //=========================================================================
    // * ADD COMPANY                                                          *
    //=========================================================================
    // - Registers a new company
    // - Expects a CompanyRegisterModel
    // - Returns a CompanyModel
    addCompany(company) {
        return this.apiService.post('/company', company);
    }

    //=========================================================================
    // * UPDATE COMPANY                                                       *
    //=========================================================================
    // - Updates a company
    // - Expects a CompanyModel
    // - Returns 200 (OK) response
    updateCompany(company) {
        return this.apiService.put('/company/' + company.id, company);
    }
}
