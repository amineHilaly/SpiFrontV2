import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private evaluationUrl: string;
 
  constructor(private http: HttpClient,
    private router:Router) {
    this.evaluationUrl = 'http://localhost:8080';
  }

  public getAllEvaluations(){
    return this.http.get(this.evaluationUrl+"/evaluation");
  }

  public save(evaluation) {
    return this.http.post(this.evaluationUrl+"/evaluation", evaluation);
  }

  public getByPromotion(pk): Observable<any>{
    console.log(pk);
    return this.http.post(this.evaluationUrl+"/evaluation/promeval",pk);
  }

  public getEcBycodeForm(cf,cue): Observable<any>{
	return this.http.get(this.evaluationUrl+"/elementConstitutif/"+cf+"/"+cue);
}

	getUeBycodeForm(cf):Observable<any>{
	return this.http.get(this.evaluationUrl+"/uniteEnseignement/"+cf);
}


	
}
