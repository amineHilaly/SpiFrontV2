import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class DomaineService {
	endpoint = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

getPays(): Observable<any>{
		return this.http.get(this.endpoint+"Pays");
}

getUniversites(): Observable<any>{
		return this.http.get(this.endpoint+"Universites");
}

getPromotions(): Observable<any>{
		return this.http.get(this.endpoint+"promotions");
}

getEtudiantById():Observable<any>{
	return this.http.get(this.endpoint+"/{noEtudiant}");
}


}

