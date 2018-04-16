import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class StudentService {
    constructor(
        private apiService: ApiService,
        private http: HttpClient
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
    // * UPDATE STUDENT                                                       *
    //=========================================================================
    // - Updates an existing student
    // - Expects a StudentModel
    // - Returns 200 (OK) response
    updateStudent(student) {
        return this.apiService.put('/students/' + student.id, student);
    }

    getNewMatches(studentId) {
      return [
        {
          "id": 1,
          "student": {
              "id": 1,
              "firstName": "Person",
              "lastName": "McPersonson",
              "skills": [
                  {
                      "id": 13,
                      "name": "HTML5"
                  }
              ],
              "email": "student@example.com",
              "graduationDate": "2018-04-12",
              "school": "",
              "major": null,
              "gpa": 0,
              "user": {
                  "id": 1,
                  "username": "student@example.com",
                  "roles": [
                      {
                          "id": 1,
                          "name": "student"
                      }
                  ]
              },
              "phoneNumber": null,
              "contactEmail": null,
              "website": null,
              "preferredLocations": [],
              "preferredIndustries": [],
              "preferredCompanySizes": []
          },
          "job": {
              "id": 6,
              "status": 0,
              "positionTitle": "Front End Developer",
              "description": "Work in an innovative and challenging agile environment at the enterprise level with a bunch of microservices. Use the latest Javascript frameworks to help people access pictures of their friends.",
              "locations": [
                  "San Francisco, CA",
                  "New York City, NY"
              ],
              "requiredSkills": [
                  {
                      "id": 13,
                      "name": "HTML5"
                  },
                  {
                      "id": 14,
                      "name": "Cascading Style Sheets (CSS)"
                  },
                  {
                      "id": 15,
                      "name": "JavaScript"
                  },
                  {
                      "id": 16,
                      "name": "Git Version Control"
                  }
              ],
              "niceToHaveSkills": [
                {
                    "id": 8,
                    "name": "Ember"
                }
              ],
              "niceToHaveSkillsWeight": 0.5,
              "minGPA": 0,
              "hasWorkExperience": true,
              "matchThreshold": 0.8,
              "duration": 10,
              "problemStatement": "Job problem phase text here.",
              "video": "12",
              "company": {
                  "id": 1,
                  "companyName": "Apple",
                  "locations": [
                      "San Francisco, CA",
                      "New York City, NY"
                  ],
                  "size": 1,
                  "industries": [
                      "Social Network"
                  ],
                  "approvalStatus": false,
                  "presentation": "",
                  "companyDescription": "",
                  "websiteURL": "www.apple.com",
                  "emailSuffix": "",
                  "userId": -1
              },
              "recruiter": {
                  "id": 1,
                  "firstName": "Recruity",
                  "lastName": "Johnson",
                  "email": "recruiter@email.com",
                  "company": {
                      "id": 1,
                      "companyName": "Apple",
                      "locations": [
                          "Cupertino, California"
                      ],
                      "size": 1,
                      "industries": [
                          "Hardware"
                      ],
                      "approvalStatus": false,
                      "presentation": "",
                      "companyDescription": "",
                      "websiteURL": "www.apple.com",
                      "emailSuffix": "",
                      "userId": -1
                  },
                  "phoneNumber": "1234567890",
                  "contactEmail": "contact@company.com",
                  "user": {
                      "id": 3,
                      "username": "recruiter@email.com",
                      "roles": [
                          {
                              "id": 2,
                              "name": "recruiter"
                          }
                      ]
                  }
              }
          },
          "matchStrength": 0.8,
          "tag": null,
          "studentProblemResponse": null,
          "studentPresentationLink": null,
          "viewedSinceLastUpdate": false,
          "timeLastUpdated": "2018-04-12",
          "applicationStatus": "IN_PROGRESS",
          "currentPhase": "PROBLEM_WAITING_FOR_STUDENT"
        },
        {
          "id": 2,
          "student": {
              "id": 1,
              "firstName": "Person",
              "lastName": "McPersonson",
              "skills": [
                  {
                      "id": 13,
                      "name": "HTML5"
                  }
              ],
              "email": "student@example.com",
              "graduationDate": "2018-04-12",
              "school": "",
              "major": null,
              "gpa": 0,
              "user": {
                  "id": 1,
                  "username": "student@example.com",
                  "roles": [
                      {
                          "id": 1,
                          "name": "student"
                      }
                  ]
              },
              "phoneNumber": null,
              "contactEmail": null,
              "website": null,
              "preferredLocations": [],
              "preferredIndustries": [],
              "preferredCompanySizes": []
          },
          "job": {
              "id": 6,
              "status": 0,
              "positionTitle": "Another Job Position",
              "description": "Job description 2 here in plain text.",
              "locations": [
                  "New York City, New York"
              ],
              "requiredSkills": [
                  {
                      "id": 13,
                      "name": "HTML5"
                  }
              ],
              "niceToHaveSkills": [
                {
                    "id": 14,
                    "name": "CSS3"
                }
              ],
              "niceToHaveSkillsWeight": 0.5,
              "minGPA": 0,
              "hasWorkExperience": true,
              "matchThreshold": 0.8,
              "duration": 7,
              "problemStatement": "This is the problem statement",
              "video": "12",
              "company": {
                  "id": 1,
                  "companyName": "Apple",
                  "locations": [
                      "Cupertino, California"
                  ],
                  "size": 1,
                  "industries": [
                      "Hardware"
                  ],
                  "approvalStatus": false,
                  "presentation": "",
                  "companyDescription": "",
                  "websiteURL": "www.apple.com",
                  "emailSuffix": "",
                  "userId": -1
              },
              "recruiter": {
                  "id": 1,
                  "firstName": "Recruity",
                  "lastName": "Johnson",
                  "email": "recruiter@email.com",
                  "company": {
                      "id": 1,
                      "companyName": "Apple",
                      "locations": [
                          "Cupertino, California"
                      ],
                      "size": 1,
                      "industries": [
                          "Hardware"
                      ],
                      "approvalStatus": false,
                      "presentation": "",
                      "companyDescription": "",
                      "websiteURL": "www.apple.com",
                      "emailSuffix": "",
                      "userId": -1
                  },
                  "phoneNumber": "1234567890",
                  "contactEmail": "contact@company.com",
                  "user": {
                      "id": 3,
                      "username": "recruiter@email.com",
                      "roles": [
                          {
                              "id": 2,
                              "name": "recruiter"
                          }
                      ]
                  }
              }
          },
          "matchStrength": 0.7,
          "tag": null,
          "studentProblemResponse": null,
          "studentPresentationLink": null,
          "viewedSinceLastUpdate": false,
          "timeLastUpdated": "2018-04-12",
          "applicationStatus": "IN_PROGRESS",
          "currentPhase": "PROBLEM_WAITING_FOR_STUDENT"
        }
      ];
    }
}
