import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionService } from '../../../service/promotion.service';
import { EtudiantService } from '../../../service/etudiant.service';
import { EtudiantDetailComponent } from '../../etudiant/etudiant-detail/etudiant-detail.component';
import { DomaineService } from 'src/app/service/domaine.service';
import { Observable } from 'rxjs';
import { EtudiantUpdateComponent } from '../etudiant-update/etudiant-update.component';
import { EtudiantFormComponent } from '../etudiant-form/etudiant-form.component';
@Component({
  selector: 'app-etudiants-promotion',
  templateUrl: './etudiants-promotion.component.html',
  styleUrls: ['./etudiants-promotion.component.scss']
})
export class EtudiantsPromotionComponent implements OnInit {

  public  etudiants :any;
  public myEtudiants:any;
  public promotion:any;
  
  constructor(private prmotionService: PromotionService, private etudiantService: EtudiantService, private domaineService: DomaineService,private theRouter:Router, private router:ActivatedRoute){
    
    let annee = this.router.snapshot.paramMap.get('annee');
    let codeformation = this.router.snapshot.paramMap.get('codeformation');
    console.log(annee+" "+codeformation);
    this.getPromotion(annee,codeformation);
    this.getEtudiants(annee,codeformation);
  }

  ngOnInit() {
    
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
      
      this.prmotionService.getdetailPromotion(promotionPK).subscribe ( data=>{
        // this.etudiant=data;
         //console.log(this.etudiant);
          this.promotion =data;
         console.log(this.promotion);
   },err=>{
     console.log(err)
   })
      
    
  }


  getEtudiants(annee,codeFormation){
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
    this.prmotionService.getEtudiantPromotion(promotionPK)
    .subscribe ( data=>{
         // this.etudiant=data;
          //console.log(this.etudiant);
          this.etudiants=data;
          console.log(this.etudiants);
    },err=>{
      console.log(err)
    })
  }

  updateEtudiant(noEtudiant) {
    let etudiant: any;
    this.etudiantService.detail(noEtudiant).subscribe((data) => {
      etudiant = data;
      EtudiantUpdateComponent.etudiant = data;
      EtudiantUpdateComponent.promotion = this.promotion;
      this.domaineService.getPays().subscribe((pays) => {
        EtudiantUpdateComponent.pays = pays;
        this.domaineService.getUniversites().subscribe((univs) => {
          EtudiantUpdateComponent.univOrigin = univs;
          EtudiantUpdateComponent.promotion = this.promotion;
          this.theRouter.navigateByUrl("Etudiant/update");
        })
      })

    })
  }

  showEtudiant(noEtudiant) {
    let etudiant: any;
    this.etudiantService.detail(noEtudiant).subscribe((data) => {
      etudiant = data;
      EtudiantDetailComponent.etudiant = data;
      this.domaineService.getPays().subscribe((pays) => {
        console.log((pays));
        EtudiantDetailComponent.pays = pays;
        this.theRouter.navigateByUrl("Etudiant/detail/" + noEtudiant);
      })
    })
  }

  addEtudiant(){
    EtudiantFormComponent.promotion = this.promotion;
    this.theRouter.navigateByUrl("Etudiant/Add");
  }

}
