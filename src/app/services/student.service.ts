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

    addStudent(student) {
      return this.apiService.post('/students', student);
    }

    getStudentById(id) {
        return this.apiService.get('/students/' + id);
    }

    getStudentByEmail(email) {
        return this.apiService.get('/students/byEmail/' + email);
    }

    updateStudent(student) {
        return this.apiService.put('/students/' + student.id, student);
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
