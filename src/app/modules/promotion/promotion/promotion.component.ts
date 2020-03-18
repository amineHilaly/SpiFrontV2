import { Component, OnInit, ViewChild } from '@angular/core';
import { PromotionService } from '../../../service/promotion.service';
import { MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { DialogInfoComponent } from '../../dialog-info/dialog-info.component';
import { Router } from '@angular/router';


export interface PeriodicElement {
 
  symbol: string;
};

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

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.promotionService.getAllPromotion()
      .subscribe((data) => {
        this.promotions = data;
        console.log(this.promotions);
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


  DetailPromotion(promotionPK){
    this.dialog.open(DialogInfoComponent);

    this.promotionService.getdetailPromotion(promotionPK)
      .subscribe((DetaiP) => {
        this.detail = DetaiP;
        console.log(this.detail);
      }, err => {
      });
  }


  Afficheretudiant(promotion){
    console.log();
   this.promotionService.getEtudiantPromotion(promotion.promotionPK)
    .subscribe ( data=>{
          this.etudiant=data;
          console.log(this.etudiant);
          DialogInfoComponent.etudiants=data;
          DialogInfoComponent.promotionDialog=promotion;
          this.dialog.open(DialogInfoComponent);
    },err=>{
      console.log(err)
    })

  }
}
