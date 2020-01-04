import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Login} from '../model/login';
import {environment} from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient,
    private toast: ToastrService) { }

/********************************************

=> base url -> '/user'

* GET    /signup = intern having login access!
* POST   /signup = creating a intern access!
* DELETE /:id = removing an intern
* GET    /:id = info of a particular intern
* POST   /login = login to dashboard
* PUT    /password = updating password!

********************************************/

  private _url = environment.apiBaseURL + '/user';

  public headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  });

  //making an user for intership
  makeLoginCredentials(data):Observable<any>{
    const url = this._url + '/signup';
    return this.http.post<any>(url,data,{
      headers:this.headers
    })
  }

  //getting the access
  postData(data): Observable<any> {
    const url = this._url + '/login';
    return this.http.post<any>(url, data);
  }

  //admin 
  getData(): Observable<Login[]> {
    const url = this._url + '/signup';
    return this.http.get<Login[]>(url,{headers: this.headers});
  }

  editPassword(id,data): Observable<any> {
    const url = this._url + '/password/'+id;
    return this.http.put<any>(url, data, {headers: this.headers});
  }

  //deleting the user details : 
  deleteIntern(id):Observable<any>{
    return this.http.delete(this._url+'/'+id,{
      headers:this.headers
    });
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
