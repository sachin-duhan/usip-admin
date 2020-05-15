import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class OfficerService {

    /************************************************
    
    => Bse URL = '/officer'
    
    * GET      '/' = get all officers
     * POST     '/create' = creating a new officer
        |_
          |-> name phone email
          |-> deptt
    
     * PUT      'add/:id' = assigning an intern to an officer
        |-> this is also adds the officer to the intern profile as well!
     * DELETE    '/remove/:id' = removing an intern from an officer
    
     ***********************************************/

    private _urlOfficer = environment.apiBaseURL + '/officer';

    constructor(private http: HttpClient) { }

    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    });

    // get the officer
    getOfficers(): Observable<any> {
        const url = this._urlOfficer;

        return this.http.get<any>(url, {
            headers: this.headers,
            reportProgress: true,
            observe: 'body'
        });
    }

    // making an user
    createOfficer(data): Observable<any> {
        const url = this._urlOfficer + '/create';
        return this.http.post<any>(url, data, {
            headers: this.headers
        });
    }

    update_officer(data, id: any): Observable<any> {
        const url = this._urlOfficer + '/update/' + id;
        return this.http.put<any>(url, data, {
            headers: this.headers
        });
    }

    // delete an officer
    deleteOfficer(data): Observable<any> {
        const url = this._urlOfficer + '/inactive/' + data;
        return this.http.delete<any>(url, {
            headers: this.headers
        });
    }

    // adding an intern to an officer
    pushIntern(data, id): Observable<any> {
        const url = this._urlOfficer + '/add/' + id;
        return this.http.post<any>(url, data, {
            headers: this.headers
        });
    }

}
