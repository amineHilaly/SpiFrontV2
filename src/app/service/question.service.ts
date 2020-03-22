import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private host: string = "http://localhost:8080";
  constructor(private http: HttpClient) { }



  getAllQuestion() {
    return this.http.get(this.host + "/questions");
  }
}
