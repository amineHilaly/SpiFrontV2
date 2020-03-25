import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../../../service/evaluation.service';
import {FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss']
})
export class EvaluationListComponent implements OnInit {

  constructor(private evaluationService: EvaluationService,  private router:Router, private activRouter:ActivatedRoute) {
    let annee = this.activRouter.snapshot.paramMap.get('annee');
    let codeformation = this.activRouter.snapshot.paramMap.get('codeformation');
    console.log(annee+" "+codeformation);
    //this.getEvaluations(annee,codeformation);

   }





  evaluations : any = [];
  detail : any =[];
  page;
  pageNumber = 1;
  pagesRange = [];
  numberOfPages;
  numberOfElements = 1;
  pageable;

  ngOnInit() {
    this.getAll();
  }

  private getPage() {
    this.page = this.evaluations.slice((this.pageNumber - 1) * this.numberOfElements, this.pageNumber  * this.numberOfElements);
  }

  private getAll() {
    this.evaluationService.getAllEvaluations()
      .subscribe((data) => {
        this.evaluations = data;
        this.numberOfPages = Math.floor(this.evaluations.length/this.numberOfElements);
        if((this.evaluations.length % this.numberOfElements) != 0){
          this.numberOfPages++;
        }
        for(let i = 1  ; i < this.numberOfPages ; i++  ){
          this.pagesRange.push(i+1);
        }
        if(this.numberOfPages == 1){
          this.pageable= false;
        }else{
          this.pageable= true;
        }
        this.getPage();
        
      }, err => {
      });
  }






    private getEvaluations(annee,codeFormation){
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
    this.evaluationService.getByPromotion(promotionPK)
    .subscribe ( data=>{
         // this.etudiant=data;
          //console.log(this.etudiant);
          this.evaluations=data;
          console.log(this.evaluations);
          this.numberOfPages = Math.floor(this.evaluations.length/this.numberOfElements);
        if((this.evaluations.length % this.numberOfElements) != 0){
          this.numberOfPages++;
        }
        for(let i = 1  ; i < this.numberOfPages ; i++  ){
          this.pagesRange.push(i+1);
        }
        if(this.numberOfPages == 1){
          this.pageable= false;
        }else{
          this.pageable= true;
        }
        this.getPage();
    },err=>{
      console.log(err)
    })
  }




  RederectionAjout(){
    this.router.navigateByUrl("Evaluation/add");
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


