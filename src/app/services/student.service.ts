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
    // * GET NEW MATCHES                                                      *
    //=========================================================================
    // - Get all new job matches (phase 1)
    // - Expects a StudentModel id number
    // - Returns an array of MatchModels
    getNewMatches(studentId) {
      let matches = [
        {
          "id": 1,
          "student": {
              "id": 1,
              "firstName": "Person",
              "lastName": "McPersonson",
              "skills": [
                  {
                      "id": 73,
                      "name": "Javascript"
                  },
                  {
                      "id": 72,
                      "name": "CSS3"
                  },
                  {
                      "id": 71,
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
              "preferredCompanySizes": [],
              "presentationLinks": [
                  {
                      "id": 7,
                      "title": "Personal Website",
                      "link": "http://www.studentsite.com"
                  }
              ]
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
                      "id": 71,
                      "name": "HTML5"
                  },
                  {
                      "id": 72,
                      "name": "Cascading Style Sheets (CSS)"
                  },
                  {
                      "id": 73,
                      "name": "Javascript"
                  },
                  {
                      "id": 60,
                      "name": "Agile Development"
                  }
              ],
              "niceToHaveSkills": [
                {
                    "id": 74,
                    "name": "React"
                }
              ],
              "niceToHaveSkillsWeight": 0.5,
              "minGPA": 0,
              "hasWorkExperience": true,
              "matchThreshold": 0.8,
              "duration": 10,
              "problemStatement": "We work on a lot of web-based applications, and our front end developers often make decisions on which Javascript frameworks to use. We typically use ReactJS alongside many others. We also have well organized style guides and design templates for our front end developers to follow and have good visibility into what they're making. Attention to detail and an emphasis on UX is important with the front end work that we do so the many people that use our products are happy to do so.",
              "video": "12",
              "presentationLinks": [
                  {
                      "id": 5,
                      "title": "Test Link",
                      "link": "http://www.google.com"
                  }
              ],
              "company": {
                  "id": 1,
                  "companyName": "Facebook",
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
                  "websiteURL": "www.facebook.com",
                  "emailSuffix": "",
                  "userId": -1,
                  "presentationLinks": [
                      {
                          "id": 5,
                          "title": "Test Link",
                          "link": "http://www.google.com"
                      }
                  ]
              },
              "recruiter": {
                  "id": 1,
                  "firstName": "Recruity",
                  "lastName": "Johnson",
                  "email": "recruiter@email.com",
                  "company": {
                      "id": 1,
                      "companyName": "Facebook",
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
                      "id": 73,
                      "name": "Javascript"
                  },
                  {
                      "id": 72,
                      "name": "CSS3"
                  },
                  {
                      "id": 71,
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
              "preferredCompanySizes": [],
              "presentationLinks": [
                  {
                      "id": 7,
                      "title": "Personal Website",
                      "link": "http://www.studentsite.com"
                  }
              ]
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
                      "id": 73,
                      "name": "Javascript"
                  },
                  {
                      "id": 60,
                      "name": "Agile Development"
                  }
              ],
              "niceToHaveSkills": [
                {
                    "id": 72,
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
              "presentationLinks": [
                  {
                      "id": 5,
                      "title": "Test Link",
                      "link": "http://www.google.com"
                  }
              ],
              "company": {
                  "id": 1,
                  "companyName": "Facebook",
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
                  "userId": -1,
                  "presentationLinks": [
                      {
                          "id": 5,
                          "title": "Test Link",
                          "link": "http://www.google.com"
                      }
                  ]
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

      matches.sort((a, b) => {
        if (a.matchStrength < b.matchStrength) return 1;
        else if (a.matchStrength > b.matchStrength) return -1;
        else return 0;
      });

      return matches;
    }

    //=========================================================================
    // * GET PHASE 2 MATCHES                                                  *
    //=========================================================================
    // - Get all phase 2 job matches (presentation phase)
    // - Expects a StudentModel id number
    // - Returns an array of MatchModels
    getPhase2Matches(studentId) {
        let matches = [
            {
                "id": 1,
                "student": {
                    "id": 1,
                    "firstName": "Person",
                    "lastName": "McPersonson",
                    "skills": [
                        {
                            "id": 73,
                            "name": "Javascript"
                        },
                        {
                            "id": 72,
                            "name": "CSS3"
                        },
                        {
                            "id": 71,
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
                    "preferredCompanySizes": [],
                    "presentationLinks": [
                        {
                            "id": 7,
                            "title": "Personal Website",
                            "link": "http://www.studentsite.com"
                        }
                    ]
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
                            "id": 71,
                            "name": "HTML5"
                        },
                        {
                            "id": 72,
                            "name": "Cascading Style Sheets (CSS)"
                        },
                        {
                            "id": 73,
                            "name": "JavaScript"
                        },
                        {
                            "id": 60,
                            "name": "Agile Development"
                        }
                    ],
                    "niceToHaveSkills": [
                        {
                            "id": 74,
                            "name": "React"
                        }
                    ],
                    "niceToHaveSkillsWeight": 0.5,
                    "minGPA": 0,
                    "hasWorkExperience": true,
                    "matchThreshold": 0.8,
                    "duration": 10,
                    "problemStatement": "Job problem phase text here.",
                    "video": "12",
                    "presentationLinks": [
                        {
                            "id": 8,
                            "title": "Company Video",
                            "link": "https://www.youtube.com/watch?v=sQYJs1rsMuo"
                        },
                        {
                            "id": 5,
                            "title": "Our Website",
                            "link": "https://www.facebook.com/careers/"
                        }
                    ],
                    "company": {
                        "id": 1,
                        "companyName": "Facebook",
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
                        "userId": -1,
                        "presentationLinks": [
                            {
                                "id": 8,
                                "title": "Company Video",
                                "link": "https://www.youtube.com/watch?v=Bey4XXJAqS8"
                            },
                            {
                                "id": 5,
                                "title": "Test Link",
                                "link": "http://www.google.com"
                            }
                        ]
                    },
                    "recruiter": {
                        "id": 1,
                        "firstName": "Recruity",
                        "lastName": "Johnson",
                        "email": "recruiter@email.com",
                        "company": {
                            "id": 1,
                            "companyName": "Facebook",
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
                "studentPresentationLinks": [
                    {
                        "id": 7,
                        "title": "Personal Website",
                        "link": "http://www.studentsite.com"
                    }
                ],
                "viewedSinceLastUpdate": false,
                "timeLastUpdated": "2018-04-12",
                "applicationStatus": "IN_PROGRESS",
                "currentPhase": "PROBLEM_WAITING_FOR_STUDENT"
            }
        ];

        matches.sort((a, b) => {
            if (a.matchStrength < b.matchStrength) return 1;
            else if (a.matchStrength > b.matchStrength) return -1;
            else return 0;
        });

        return matches;
    }

    //=========================================================================
    // * GET Final MATCHES                                                    *
    //=========================================================================
    // - Get all final matches (last phase)
    // - Expects a StudentModel id number
    // - Returns an array of MatchModels
    getFinalMatches(studentId) {
        let matches = [];

        matches.sort((a, b) => {
            if (a.matchStrength < b.matchStrength) return 1;
            else if (a.matchStrength > b.matchStrength) return -1;
            else return 0;
        });

        return matches;
    }
}
