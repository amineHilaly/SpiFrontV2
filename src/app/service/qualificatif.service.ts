import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QualificatifService {


  endpoint = 'http://localhost:8080/Qualificatif';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getAll(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  delete(id): Observable<any> {
    return this.http.delete(this.endpoint + '/' + id);
  }

  create(object): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers
    }
    return this.http.post(this.endpoint, object, options);
  }

  update(body: { idQualificatif: string; maximal: any; minimal: any; }): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers
    }
    console.log(body);
    return this.http.put(this.endpoint, body, options);
  }
}
