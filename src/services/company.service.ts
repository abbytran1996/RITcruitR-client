import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class CompanyService {
    constructor(
        private apiService: ApiService
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
        return this.apiService.get('/company/byName/' + name);
    }

    //==========================================================================
    // * GET COMPANY BY STATUS                                                 *
    //==========================================================================
    // - Given a status (for whether the company is approved or not),
    //   returns the associated companies
    // - Expects a company boolean
    // - Returns a list of CompanyModels
    getCompanyByStatus(status) {
      return this.apiService.get('/company/byStatus/' + status);
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
