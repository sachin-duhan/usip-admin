import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RegisterService {

    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    });

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError('Something bad happened!! please try again later.');
    }

    constructor(private http: HttpClient) { }

    private _urlRegsiter = environment.apiBaseURL + '/register';

    // getting the application (ADMIN)
    showRegisterations(): Observable<any> {
        return this.http.get<any>(this._urlRegsiter, {
            headers: this.headers
        }).pipe(retry(2));
    }

    get_all_qualified_applications(): Observable<any> {
        return this.http.get<any>(this._urlRegsiter + '/qualified', {
            headers: this.headers
        }).pipe(retry(2));
    }

    // get a specfic intern
    getSpecificIntern(data): Observable<any> {
        const url = this._urlRegsiter + '/' + data;
        return this.http.get<any>(url, {
            headers: this.headers
        }).pipe(retry(2));
    }

    qualify_applications(data: Array<String>): Observable<any> {
        const url = this._urlRegsiter + '/qualify/bulk';
        return this.http.put<any>(url, { interns: data }, {
            headers: this.headers
        }).pipe(retry(2));
    }

    disqualify_an_application(id: String): Observable<any> {
        const url = this._urlRegsiter + '/disqualify/' + id;
        return this.http.put<any>(url, {
            headers: this.headers
        }).pipe(retry(2));
    }

    get_qualified_applications(): Observable<any> {
        const url = this._urlRegsiter + '/qualified';
        return this.http.get<any>(url, {
            headers: this.headers
        }).pipe(retry(2));
    }

    // adding the application to db
    postRegisteration(data): Observable<any> {
        return this.http.post(this._urlRegsiter, data, {
            headers: this.headers,
        });
    }

    //delete an application from the DB
    deleteApplication(data): Observable<any> {
        return this.http.delete(this._urlRegsiter + '/' + data, {
            headers: this.headers
        });
    }

    // selecting the intern (ADMIN)
    selectIntern(data, id): Observable<any> {
        const url = this._urlRegsiter + '/qualify/' + id;
        return this.http.put<any>(url, data, {
            headers: this.headers,
        });
    }

    // allow application
    OpenApplication(data, bank_or_application): Observable<any> {
        const url = environment.apiBaseURL + '/allow/' + bank_or_application;
        return this.http.post<any>(url, data, {
            headers: this.headers
        });
    }

    // close  the application
    CloseApplication(data, bank_or_application): Observable<any> {
        const url = environment.apiBaseURL + '/allow/' + bank_or_application;
        return this.http.put<any>(url, data, {
            headers: this.headers
        });
    }

    // get status
    applicationStatus(bank_or_application): Observable<any> {
        const url = environment.apiBaseURL + '/allow/' + bank_or_application;
        return this.http.get<any>(url, {
            headers: this.headers
        });
    }

    get_all_bank_or_applications(bank_or_application): Observable<any> {
        const url = environment.apiBaseURL + '/allow/' + bank_or_application + '/all';
        return this.http.get<any>(url, {
            headers: this.headers
        });
    }

    // domain
    getDomain(): Observable<any> {
        const url = environment.apiBaseURL + '/domain';
        return this.http.get<any>(url, {
            headers: this.headers
        });
    }

    createDomain(data): Observable<any> {
        const url = environment.apiBaseURL + '/domain';
        return this.http.post<any>(url, data, {
            headers: this.headers
        });
    }

    deleteDomain(id): Observable<any> {
        const url = environment.apiBaseURL + '/domain/' + id;
        return this.http.delete<any>(url, {
            headers: this.headers
        });
    }
}
