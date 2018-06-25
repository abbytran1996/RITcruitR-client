import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class StudentService {
    constructor(
        private apiService: ApiService
    ) { }

    //=========================================================================
    // * GET STUDENT BY ID                                                    *
    //=========================================================================
    // - Given the id of a student (not a user), returns the associated student
    // - Expects a student id number
    // - Returns a StudentModel
    getStudentById(id) {
        return this.apiService.get('/students/' + id);
    }

    //=========================================================================
    // * GET STUDENT BY EMAIL                                                 *
    //=========================================================================
    // - Given a student's email, returns the associated student
    // - Expects a student email string
    // - Returns a StudentModel
    getStudentByEmail(email) {
        return this.apiService.get('/students/byEmail/' + email);
    }

    //=========================================================================
    // * ADD STUDENT                                                          *
    //=========================================================================
    // - Register a new student
    // - Expects a StudentRegisterModel
    // - Returns a StudentModel
    addStudent(student) {
      return this.apiService.post('/students', student);
    }

    //=========================================================================
    // * UPDATE STUDENT SKILLS                                                *
    //=========================================================================
    // - Updates an existing student's skills
    // - Expects a StudentModel id number, and an array of skills from a
    //   StudentModel
    // - Returns 200 (OK) response with the updated StudentModel
    updateStudentSkills(student_id, skills) {
        return this.apiService.post('/students/' + student_id + '/skills', skills);
    }

    //=========================================================================
    // * UPDATE STUDENT                                                       *
    //=========================================================================
    // - Updates an existing student
    // - Expects a StudentModel
    // - Returns 200 (OK) response
    updateStudent(student) {
        return this.apiService.put('/students/' + student.id, student);
    }

    //=========================================================================
    // * ADD STUDENT PROBLEM STATEMENT                                        *
    //=========================================================================
    // - Adds a new profile problem statement
    // - Expects a StudentModel id number and a ProblemStatementModel
    // - Returns 201 (CREATED) response and a ProblemStatementModel
    addStudentProblemStatement(studentId, problemStatement) {
        return this.apiService.post('/students/' + studentId + "/problemstatement", problemStatement);
    }

    //=========================================================================
    // * DELETE STUDENT PROBLEM STATEMENT                                     *
    //=========================================================================
    // - Deletes a profile problem statement with the given id
    // - Expects a StudentModel id number and a ProblemStatementModel id number
    // - Returns 200 (OK) response
    deleteStudentProblemStatement(studentId, problemStatementId) {
        return this.apiService.delete('/students/' + studentId + "/problemstatement/" + problemStatementId);
    }

    //=========================================================================
    // * ADD STUDENT PRESENTATION LINK                                        *
    //=========================================================================
    // - Adds a new profile presentation link
    // - Expects a StudentModel id number and a PresentationLinkModel
    // - Returns 201 (CREATED) response and a PresentationLinkModel
    addStudentPresentationLink(studentId, presentationLink) {
        return this.apiService.post('/students/' + studentId + "/link", presentationLink);
    }

    //=========================================================================
    // * DELETE STUDENT PRESENTATION LINK                                     *
    //=========================================================================
    // - Deletes a profile presentation link with the given id
    // - Expects a StudentModel id number and a PresentationLinkModel id number
    // - Returns 200 (OK) response
    deleteStudentPresentationLink(studentId, presentationLinkId) {
        return this.apiService.delete('/students/' + studentId + "/link/" + presentationLinkId);
    }

    //=========================================================================
    // * SUBMIT MATCH PROBLEM STATEMENT                                       *
    //=========================================================================
    // - Submits a match problem statement and moves it to the next phase
    // - Expects a Match id number and a problem statement string
    // - Returns 200 (OK) response
    submitMatchProblemStatement(matchId, problemStatement) {
        return this.apiService.post('/matches/' + matchId + "/problem", problemStatement);
    }

    //=========================================================================
    // * SUBMIT MATCH PRESENTATION PHASE                                      *
    //=========================================================================
    // - Submits match presentation links and moves it to the next phase
    // - Expects a Match id number and an array of presentation links
    // - Returns 200 (OK) response
    submitMatchPresentationPhase(matchId, presentationLinks) {
        return this.apiService.post('/matches/' + matchId + "/presentation", presentationLinks);
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
    // * GET NEW MATCHES                                                      *
    //=========================================================================
    // - Get all new job matches (phase 1)
    // - Expects a StudentModel id number
    // - Returns an array of MatchModels
    getNewMatches(studentId) {
      return this.apiService.get("/matches/studentMatches/" + studentId + "?phase=problem");
    }

    //=========================================================================
    // * GET PHASE 2 MATCHES                                                  *
    //=========================================================================
    // - Get all phase 2 job matches (presentation phase)
    // - Expects a StudentModel id number
    // - Returns an array of MatchModels
    getPhase2Matches(studentId) {
        return this.apiService.get("/matches/studentMatches/" + studentId + "?phase=presentation");
    }

    //=========================================================================
    // * GET FINAL MATCHES                                                    *
    //=========================================================================
    // - Get all final matches (last phase)
    // - Expects a StudentModel id number
    // - Returns an array of MatchModels
    getFinalMatches(studentId) {
        return this.apiService.get("/matches/studentMatches/" + studentId + "?phase=final");
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
}
