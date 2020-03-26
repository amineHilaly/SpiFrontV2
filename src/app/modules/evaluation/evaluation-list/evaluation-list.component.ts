import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../../../service/evaluation.service';
import {FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { PromotionService } from 'src/app/service/promotion.service';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss']
})
export class EvaluationListComponent implements OnInit {


  public  evaluations :any = [];
  public promotion:any;
  detail : any =[];
  page;
  pageNumber = 1;
  pagesRange = [];
  numberOfPages;
  numberOfElements = 2;
  pageable;
  constructor(private evaluationService: EvaluationService,private promotionService:PromotionService, private router:Router, private activRouter:ActivatedRoute) {
    let annee = this.activRouter.snapshot.paramMap.get('annee');
    let codeformation = this.activRouter.snapshot.paramMap.get('codeformation');
    this.getPromotion(annee,codeformation);
   }


   getPromotion(annee,codeFormation){
    let promotionPK ={
      "anneeUniversitaire": annee,
      "formation": {
      "codeFormation": codeFormation,
      "diplome": "",
      "n0Annee": 0,
      "nomFormation": "",
      "doubleDiplome": "",
      "debutAccreditation": "",
      "finAccreditation": ""
      }
      };
      
      this.promotionService.getdetailPromotion(promotionPK).subscribe ( data=>{
          this.promotion =data;
          this.getAll();
   },err=>{
     console.log(err)
   })
      
    
  }




  ngOnInit() {
    
  }

  private getPage() {
    this.page = this.evaluations.slice((this.pageNumber - 1) * this.numberOfElements, this.pageNumber  * this.numberOfElements);
  }

  private getAll() {
    this.evaluationService.getByPromotion(this.promotion)
      .subscribe((data) => {
        this.evaluations = data;
        this.numberOfPages = Math.floor(this.evaluations.length/this.numberOfElements);
        if((this.evaluations.length % this.numberOfElements) != 0){
          this.numberOfPages++;
        }
        for(let i = 1  ; i < this.numberOfPages ; i++  ){
          this.pagesRange.push(i+1);
        }
        if(this.numberOfPages <= 1){
          this.pageable= false;
        }else{
          this.pageable= true;
        }
        this.getPage();
        
      }, err => {
      });
  }





  RederectionAjout(){
    let promotionParam = this.promotion;
    this.router.navigateByUrl("Evaluation/Add/" +promotionParam.promotionPK.anneeUniversitaire+"/"+promotionParam.promotionPK.formation.codeFormation);
  }

  change(i){
    this.pageNumber = i;
    this.getPage();
    this.setSelected();
  }

  previous(){
    if(this.pageNumber > 1){
      this.pageNumber--;
      this.getPage()
      this.setSelected();
    }
  }

  next(){
    if(this.pageNumber < this.numberOfPages){
      this.pageNumber++;
      this.getPage()
      this.setSelected();
    }
  }

  rederectionAjout(){
    this.router.navigateByUrl("Etudiant/Add");
  }
  
  

  setSelected(){
    (document.querySelector('#li'+this.pageNumber) as HTMLLIElement).classList.add("active");
    let allPages = this.pagesRange.concat([1]);
    console.log(allPages);
    console.log(this.pagesRange);
    for(let i of allPages){
      if(i != this.pageNumber){
        (document.querySelector('#li'+i) as HTMLLIElement).classList.remove("active");
      }
    }
  }

}


