import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class StudentService {
    constructor(
        private apiService: ApiService,
        private http: HttpClient
    ) { }

    addStudent(student) {
        return this.apiService.post('/students', student)
            .pipe(map(
                data => {

                },
                err => {

                }
            ));
    }

    getStudent(email) {
        return this.apiService.get('/students/byEmail/' + email)
            .pipe(map(
                data => {

                },
                err => {

                }
            ));
    }

    updateStudent(student) {
        return this.apiService.put('/students/' + student.id + '/update', student)
            .pipe(map(
                data => {

                },
                err => {

                }
            ));
    }

    updateSkillsForStudent(student) {
        return this.apiService.post('/students/' + student.id + '/skills', student)
            .pipe(map(
                data => {

                },
                err => {

                }
            ));
    }

    uploadResume(id, resume) {
        return this.apiService.put('/students/' + id + '/uploadResume', resume)
            .pipe(map(
                data => {

                },
                err => {

                }
            ));
    }

    getResumeForStudent(id) {
        return this.apiService.get('/students/' + id + '/resume')
            .pipe(map(
                data => {

                },
                err => {

                }
            ));
    }
}