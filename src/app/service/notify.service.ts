import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class NotifyService {

    constructor(private http: HttpClient) { }

    private _urlNotify = environment.apiBaseURL + '/notification';

    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token',
    });

    publicNotification(): Observable<any> {
        return this.http.get<any>(this._urlNotify + '/public', {
            headers: this.headers
        });
    }

    internNotification(): Observable<any> {
        return this.http.get<any>(this._urlNotify + '/intern', {
            headers: this.headers,
        });
    }

    postNotification(data): Observable<any> {
        return this.http.post<any>(this._urlNotify, data);
    }

    deleteNoti(id): Observable<any> {
        const url = this._urlNotify + '/' + id;
        return this.http.delete<any>(url, {
            headers: this.headers
        });
    }
}
