import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class AuthService {
    constructor(
      private apiService: ApiService
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

      if (isStudent) {
        role = 0;
      }
      else if (isRecruiter) {
        role = 1;
      }
      else if (isAdmin) {
        role = 2;
      }
      else {
        role = -1;
      }

      return role;
    }
}
