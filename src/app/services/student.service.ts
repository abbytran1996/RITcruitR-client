import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';

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
        private http: HttpClient,
        private http2: Http
    ) { }

    addStudent(student) {
      return this.apiService.postWithOptions('/students', student, httpOptions);
    }

    getStudent(email) {
        return this.apiService.get('/students/byEmail/' + email)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    updateStudent(student) {
        return this.apiService.put('/students/' + student.id + '/update', student)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    updateSkillsForStudent(student) {
        return this.apiService.post('/students/' + student.id + '/skills', student)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    uploadResume(id, resume) {
        return this.apiService.put('/students/' + id + '/uploadResume', resume)
            .pipe(map(
                data => {
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    getResumeForStudent(id) {
        return this.apiService.get('/students/' + id + '/resume')
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
