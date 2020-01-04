import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class InternService {

  /*******************************************************************
    // handling the bank details and updation methods
    -> base URL '/intern'
  
    * GET    '/' = for all interns
    * GET    '/:id' = for a specific intern
    * GET    '/register' = for all interns with complete bank details
    * GET    'register/:id' = for specific intern
    * POST   '/register' = for creating a new entry in the DB for registeration!
        |__
          |-> phone + email = for verification
          |-> IFSC, account number, Deployment number, id, bank name
  
    * DELETE  '/register/:id'
    * PUT '/register/:id'
  
  ********************************************************************/


  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: member-ordering
  public headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  private _urlGetIntern = environment.apiBaseURL + '/intern'; // URL = localhost:4000/intern
  private _urlRegister = this._urlGetIntern + '/register';

  // get the complete intern info!!
  showRegisterIntern(): Observable<any> {
    return this.http.get<any>(this._urlRegister, {
      headers: this.headers
    });
  }

  // get he qualified interns
  showIntern(): Observable<any> {
    return this.http.get<any>(this._urlGetIntern, {
      headers: this.headers
    });
  }

  addIntern(data): Observable<any> {
    return this.http.post<any>(this._urlRegister, data, {
      headers: this.headers
    });
  }

  putIntern(id, data): Observable<any> {
    return this.http.put<any>(this._urlRegister + '/' + id, data, {
      headers: this.headers
    });
  }

  update_intern_bank_details(id, data): Observable<any> {
    console.log(data);
    return this.http.put<any>(this._urlRegister + '/' + id, data, {
      headers: this.headers
    });
  }

  // get a specific intern : 
  get_specific_intern_by_id(id): Observable<any> {
    const url = this._urlRegister + `/${id}`;
    console.log(url);
    return this.http.get<any>(url, {
      headers: this.headers
    });
  }

  // adding any kind of bug
  add_improvement(data): Observable<any> {
    const url = environment.apiBaseURL + '/bug';
    return this.http.post<any>(url, data, {
      headers: this.headers
    });
  }

  // adding any kind of bug
  get_improvement(): Observable<any> {
    const url = environment.apiBaseURL + '/bug';
    return this.http.get<any>(url, {
      headers: this.headers
    });
  }

  // adding any kind of bug
  delete_improvement(id): Observable<any> {
    const url = environment.apiBaseURL + '/bug/'+id;
    return this.http.delete<any>(url, {
      headers: this.headers
    });
  }
}