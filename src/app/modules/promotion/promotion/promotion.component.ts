import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../../service/promotion.service';
import { MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { DialogInfoComponent } from '../../dialog-info/dialog-info.component';
import { Router } from '@angular/router';
import { EtudiantsPromotionComponent } from '../../etudiant/etudiants-promotion/etudiants-promotion.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})

export class PromotionComponent implements OnInit {


  constructor(private promotionService: PromotionService, private dialog: MatDialog, private router:Router) { }

  promotions : any = [];
  detail : any =[];
  etudiant: any=[];
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
    this.page = this.promotions.slice((this.pageNumber - 1) * this.numberOfElements, this.pageNumber  * this.numberOfElements);
  }

  private getAll() {
    this.promotionService.getAllPromotion()
      .subscribe((data) => {
        this.promotions = data;
        this.numberOfPages = Math.floor(this.promotions.length/this.numberOfElements);
        if((this.promotions.length % this.numberOfElements) != 0){
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

  delete(promotionPK){
    this.promotionService.deletePromotion(promotionPK).subscribe((res: boolean) => {
      if(res){
        this.getAll();
      }else{
        alert("seppression impossible");
      }
    });
  }
  RederectionEtudiants(promotionParam){
    this.router.navigateByUrl("EtudiantsPromotion/"+promotionParam.promotionPK.anneeUniversitaire+"/"+promotionParam.promotionPK.formation.codeFormation);
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
