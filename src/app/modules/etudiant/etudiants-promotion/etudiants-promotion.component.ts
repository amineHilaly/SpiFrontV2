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

  public etudiants: any;
  public promotion: any;
  page;
  pageNumber = 1;
  pagesRange = [];
  numberOfPages;
  numberOfElements = 5;
  pageable;
  empty = false;

  constructor(private prmotionService: PromotionService, private etudiantService: EtudiantService, private domaineService: DomaineService, private theRouter: Router, private router: ActivatedRoute) {

    let annee = this.router.snapshot.paramMap.get('annee');
    let codeformation = this.router.snapshot.paramMap.get('codeformation');
    console.log(annee + " " + codeformation);
    this.getPromotion(annee, codeformation);
    this.getEtudiants(annee, codeformation);
  }

  private getPage() {
    this.page = this.etudiants.slice((this.pageNumber - 1) * this.numberOfElements, this.pageNumber * this.numberOfElements);
  }

  ngOnInit() {

  }

  getPromotion(annee, codeFormation) {
    let promotionPK = {
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

    this.prmotionService.getdetailPromotion(promotionPK).subscribe(data => {
      // this.etudiant=data;
      //console.log(this.etudiant);
      this.promotion = data;
      console.log(this.promotion);
    }, err => {
      console.log(err)
    })


  }


  getEtudiants(annee, codeFormation) {
    let promotionPK = {
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
      .subscribe(data => {
        // this.etudiant=data;
        //console.log(this.etudiant);
        this.etudiants = data;
        console.log(this.etudiants);
        this.numberOfPages = Math.floor(this.etudiants.length / this.numberOfElements);

        if(this.etudiants.length == 0){
          this.empty=true;
        }
        if ((this.etudiants.length % this.numberOfElements) != 0) {
          this.numberOfPages++;
        }
        for (let i = 1; i < this.numberOfPages; i++) {
          this.pagesRange.push(i + 1);
        }
        if (this.numberOfPages < 1) {
          this.pageable = false;
        } else {
          this.pageable = true;
        }
        this.getPage();
      }, err => {
        console.log(err)
      })
  }


  change(i) {
    this.pageNumber = i;
    this.getPage();
    this.setSelected();
  }

  previous() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getPage()
      this.setSelected();
    }
  }

  next() {
    if (this.pageNumber < this.numberOfPages) {
      this.pageNumber++;
      this.getPage()
      this.setSelected();
    }
  }

  setSelected() {
    (document.querySelector('#li' + this.pageNumber) as HTMLLIElement).classList.add("active");
    let allPages = this.pagesRange.concat([1]);
    console.log(allPages);
    console.log(this.pagesRange);
    for (let i of allPages) {
      if (i != this.pageNumber) {
        (document.querySelector('#li' + i) as HTMLLIElement).classList.remove("active");
      }
    }
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
        EtudiantDetailComponent.pays = pays;
        this.domaineService.getUniversites().subscribe((univs) => {
          EtudiantDetailComponent.univs = univs;
          this.theRouter.navigateByUrl("Etudiant/detail");
        })
      })
    })
  }

  addEtudiant() {
    EtudiantFormComponent.promotion = this.promotion;
    this.theRouter.navigateByUrl("Etudiant/Add");
  }

}
