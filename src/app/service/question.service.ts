import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private host: string = "http://localhost:8080";
  constructor(private http: HttpClient) { }
  endpoint = 'http://localhost:8080/Questions';
  endpointt = 'http://localhost:8080/Addquestion';
  endpointtt = 'http://localhost:8080/updateQuestion';
  endpointttt = 'http://localhost:8080/question';
  endpoin = 'http://localhost:8080/ref';






  getAllQuestion() {
    return this.http.get(this.host + "/questions");
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
    return this.http.post(this.endpointt, object, options);
  }
  update(object): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers
    }
    return this.http.post(this.endpointtt, object, options);
  }
  detail(question): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers
    }

    return this.http.post(this.endpointttt, question,options);
  }
  ref(question){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers
    }

    return this.http.post(this.endpoin, question,options);

  }

}
