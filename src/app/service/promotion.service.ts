import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  public host:string="http://localhost:8080";
  promotionPksend=null;
  private messageSource = new BehaviorSubject(this.promotionPksend);
  currentMessage = this.messageSource.asObservable();



  constructor(private http:HttpClient) { }

  getAllPromotion(){
    return this.http.get(this.host+"/promotions");
  }


  deletePromotion(promotionPK): Observable<any> {
    console.log(promotionPK);
    
    
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let options = {
        headers: headers
      };
      

    return this.http.delete(this.host+"/Deletepromotion",promotionPK);
    
  }

  getdetailPromotion(promotionPK): Observable<any>{
    console.log(promotionPK);
    this.promotionPksend=promotionPK;
    //this.messageSource.next(this.promotionPksend);
    return this.http.post(this.host+"/promotions",promotionPK);
  }


  getEtudiantPromotion(pk): Observable<any>{
    return this.http.post(this.host+"/Etudiantspromotion",pk);
  }


  
}

