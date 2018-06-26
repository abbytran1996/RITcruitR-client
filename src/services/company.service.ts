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
    // * APPROVE COMPANY                                                      *
    //=========================================================================
    // - Approves an existing company
    // - Expects a CompanyModel
    // - Returns 200 (OK) response
    approveCompany(company) {
      return this.apiService.patch('/company/' + company.id + '/status/approved');
    }

    //=========================================================================
    // * DENY COMPANY                                                         *
    //=========================================================================
    // - Denies an existing company
    // - Expects a CompanyModel
    // - Returns 200 (OK) response
    denyCompany(company) {
      return this.apiService.patch('/company/' + company.id + '/status/denied');
    }

    //=========================================================================
    // * ARCHIVE COMPANY                                                      *
    //=========================================================================
    // - Archives an existing company
    // - Expects a CompanyModel
    // - Returns 200 (OK) response
    archiveCompany(company) {
      return this.apiService.patch('/company/' + company.id + '/status/archived');
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

    //=========================================================================
    // * ADD COMPANY PRESENTATION LINK                                        *
    //=========================================================================
    // - Adds a new profile presentation link
    // - Expects a CompanyModel id number and a PresentationLinkModel
    // - Returns 201 (CREATED) response and a PresentationLinkModel
    addCompanyPresentationLink(companyId, presentationLink) {
        return this.apiService.post('/company/' + companyId + "/link", presentationLink);
    }

    //=========================================================================
    // * DELETE COMPANY PRESENTATION LINK                                     *
    //=========================================================================
    // - Deletes a profile presentation link with the given id
    // - Expects a CompanyModel id number and a PresentationLinkModel id number
    // - Returns 200 (OK) response
    deleteCompanyPresentationLink(companyId, presentationLinkId) {
        return this.apiService.delete('/company/' + companyId + "/link/" + presentationLinkId);
    }
}
