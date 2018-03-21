import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(
        private apiService: ApiService,
        private http: HttpClient
    ) { }

    login(user) {
        return this.apiService.post('/user/login', user)
            .pipe(map(
                data => {
                    if (data.exception !== null) {
                        return null;
                    }

                    window.localStorage.setItem('id', data.id);
                    return data;
                },
                err => {
                    return err;
                }
            ));
    }

    logout() {
        window.localStorage.removeItem('id');
    }
}