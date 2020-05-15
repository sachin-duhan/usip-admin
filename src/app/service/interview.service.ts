import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InterviewService {

    constructor(private http: HttpClient) { }
    private _url = environment.apiBaseURL + '/interview';

    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    });

    schedule_interview_in_BULK(data): Observable<any> {
        const url = this._url + '/bulk';
        return this.http.post<any>(url, data, {
            headers: this.headers
        })
    }

    get_all_upcoming_interviews(): Observable<any> {
        const url = this._url + '/upcoming';
        return this.http.get<any>(url, {
            headers: this.headers
        })
    }

    remove_an_interview(id:String): Observable<any> {
        const url = this._url + '/' + id;
        return this.http.delete<any>(url,{
            headers: this.headers
        })
    }

    update_status_of_applicants_interview(data, id): Observable<any> {
        const url = this._url + '/'+id;
        return this.http.put<any>(url, data, {
            headers: this.headers
        })
    }

    update_interviews_in_bulk(data): Observable<any> {
        const url = this._url + '/update/bulk';
        return this.http.put<any>(url, data, {
            headers: this.headers
        })
    }
}
