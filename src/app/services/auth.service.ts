import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(
        private apiService: ApiService,
        private httpC: HttpClient
    ) { }

    login(user) {
      return this.apiService.post('/user/login', user);
    }

    logout() {
        window.localStorage.removeItem('id');
    }
}
