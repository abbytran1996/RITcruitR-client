import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@app/env';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient
    ) { }

    private formatErrors(error: any) {
        return new ErrorObservable(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(
          `${environment.api_url}${path}`,
          { params }
        );
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            body
        );
    }

    postWithOptions(path: string, body: Object = {}, options: any): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            body,
            options
        );
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            body
        );
    }

    delete(path: string): Observable<any> {
        return this.http.delete(
            `${environment.api_url}${path}`
        );
    }
}
