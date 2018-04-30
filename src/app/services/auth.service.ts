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

    //=========================================================================
    // * LOGIN                                                                *
    //=========================================================================
    // - Authenticates a user
    // - Expects a LoginModel
    // - Returns a UserModel
    login(user) {
      return this.apiService.post('/user/login', user);
    }

    //=========================================================================
    // * LOGOUT                                                               *
    //=========================================================================
    // - Removes all local storage variables for a user
    logout() {
        window.localStorage.removeItem('id');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('role');
    }

    //=========================================================================
    // * SET LOCAL VARS                                                       *
    //=========================================================================
    // - Sets local storage variables for a user
    setLocalVars(user) {
      window.localStorage.setItem('id', user.id);
      window.localStorage.setItem('email', user.username);
    }

    //=========================================================================
    // * GET USER ROLE                                                        *
    //=========================================================================
    // - Gets the first role of the given user
    getUserRole(user) {
      let isStudent = false;
      let isRecruiter = false;
      let isAdmin = false;
      let role = 0;

      user.roles.forEach(role => {
        if (role.name == "student") {
          isStudent = true;
        }
        else if (role.name == "recruiter") {
          isRecruiter = true;
        }
        else if (role.name == "admin") {
          isAdmin = true;
        }
      });

      // TODO: Update these role IDs so they can't be changed through local storage
      if (isStudent) {
        role = 0;
      }
      else if (isRecruiter) {
        role = 1;
      }

      return role;
    }
}
