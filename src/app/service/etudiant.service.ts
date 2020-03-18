import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Etudiant } from './etudiant'

import { Router} from '@angular/router';




@Injectable()
export class EtudiantService {
 
  private etudiantUrl: string;
  private etudiant :Etudiant;
 
  constructor(private http: HttpClient,
    private router:Router) {
    this.etudiantUrl = 'http://localhost:8080/Etudiant';
  }
 
  public findAll(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.etudiantUrl+"/etudiants");
  }
 
  public save(etudiant) {
    return this.http.post(this.etudiantUrl, etudiant);
  }

  public setter(etudiant : Etudiant){
    this.etudiant = etudiant;
  }

  public getter(){
    return this.etudiant;
  }


    update(etudiant){ 
      this.setter(etudiant);
      this.router.navigate(['/modif'])

  }

 


  detail(noEtudiant){
    return this.http.get(this.etudiantUrl+'/'+noEtudiant);
  }

}

