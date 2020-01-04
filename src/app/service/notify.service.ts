import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NotifyService {


  /*****************************************************

=> base URL = '/notification'

* GET '/public' = getting all notification for public
* GET '/intern' = intern notification (private)!
* POST '/' = adding a notification
	|_
	  |-> title, fileName
	  |-> visibilty ( Public or Intern )

* DELETE '/:id' = removing a notification!

******************************************************/

  constructor(private http: HttpClient) { }

  private _urlNotify = environment.apiBaseURL + '/notification';

  // headers!!
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  });

  // fetching the notification! - public
  publicNotification(): Observable<any> {
    return this.http.get<any>(this._urlNotify + '/public', {
      headers: this.headers,
      reportProgress: true,
      observe: 'body'
    });
  }

  // intern notification!!
  internNotification(): Observable<any> {
    return this.http.get<any>(this._urlNotify + '/intern', {
      headers: this.headers,
      reportProgress: true,
      observe: 'body'
    });
  }

  // making a new notification!!
  postNotification(data): Observable<any> {
    return this.http.post<any>(this._urlNotify, data, {
      headers: this.headers,
      reportProgress: true,
      observe: 'body'
    });
  }

  // delete notification!!
  deleteNoti(id): Observable<any> {
    const url = this._urlNotify +'/'+ id;
    return this.http.delete<any>(url, {
      headers: this.headers
    });
  }
}
