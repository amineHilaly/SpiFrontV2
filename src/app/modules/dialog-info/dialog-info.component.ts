import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionService } from '../../service/promotion.service';
import { EtudiantService } from '../../service/etudiant.service';
import { EtudiantDetailComponent } from '../etudiant/etudiant-detail/etudiant-detail.component';
import { MatDialogRef } from '@angular/material';
import { DomaineService } from 'src/app/service/domaine.service';
import { EtudiantUpdateComponent } from '../etudiant/etudiant-update/etudiant-update.component';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent implements OnInit {

  public static etudiants: any;
  public myEtudiant: any;
  public static promotionDialog: any;
  public promotion: any;

  constructor(private prmotionService: PromotionService, private etudiantService: EtudiantService, private domaineService: DomaineService, private activatedRoute: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<DialogInfoComponent>) {
    this.myEtudiant = DialogInfoComponent.etudiants;
    this.promotion = DialogInfoComponent.promotionDialog;
    console.log(this.myEtudiant);
  }
  ngOnInit() {


  }

  afficherEtudiant(noEtudiant) {
    let etudiant: any;
    this.etudiantService.detail(noEtudiant).subscribe((data) => {
      etudiant = data;
      EtudiantDetailComponent.etudiant = data;
      this.domaineService.getPays().subscribe((pays) => {
        console.log((pays));
        EtudiantDetailComponent.pays = pays;
        this.router.navigateByUrl("Etudiant/detail/" + noEtudiant);
        this.dialogRef.close();
      })
    })

  }

  updateEtudiant(noEtudiant) {
    let etudiant: any;
    this.etudiantService.detail(noEtudiant).subscribe((data) => {
      etudiant = data;
      EtudiantUpdateComponent.etudiant = data;
      this.domaineService.getPays().subscribe((pays) => {
        EtudiantUpdateComponent.pays = pays;
        this.domaineService.getUniversites().subscribe((univs) => {
          EtudiantUpdateComponent.univOrigin = univs;
          console.log(univs);
          this.router.navigateByUrl("Etudiant/update");
          this.dialogRef.close();
        })
      })

    })

  }




}
