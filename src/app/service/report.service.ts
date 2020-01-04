import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private _urlReport = environment.apiBaseURL + '/report';
  
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  });

  constructor(private http: HttpClient) { }

/*========================================================
 * base URL = '/report'
 *
 * GET = '/'
 *  \_ get all submitted intern reports!!
 *
 * GET = '/:id'
 *  \_ get a specific report using report ID
 *
 * GET = 'intern/:id'
 *  \_ get all reports of a specific intern
 *
 * POST = '/:id'
 * \_ making a new report using the intern
 *
 * DELETE = '/'
 * \_ delete a report using the report ID
 *
 =========================================================*/

  // getting all reports
  getAllReport(): Observable<any> {
    return this.http.get<any>(this._urlReport, {
      headers: this.headers
    });
  }
  // get a sepcific report using a report ID
  getSpecificReport(data): Observable<any> {
    const url = this._urlReport + '/' + data;
    return this.http.get<any>(url, {
      headers: this.headers
    });
  }

  // adding intern
  add_report_using_intern_id(id,data): Observable<any> {
    const url = this._urlReport + '/' + id;
    return this.http.post<any>(url, data);
  }

  // get an interns report 
  get_all_intern_report(data): Observable<any> {
    const url = this._urlReport + '/intern/' + data;
    return this.http.get<any>(url, {
      headers: this.headers
    });
  }
  get_report_file(data):Observable<any>{
    const _url = `${environment.apiBaseURL}/public/${data}`;
    console.log(_url);
    return this.http.get(_url,{
      headers:this.headers
    });
  }
  // removing an report using the report ID
  deleteReport(data): Observable<any> {
    const url = this._urlReport +'/' +data;
    return this.http.delete<any>(url, {
      headers: this.headers
    });
  }

}
