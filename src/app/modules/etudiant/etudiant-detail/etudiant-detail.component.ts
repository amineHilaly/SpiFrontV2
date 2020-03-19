import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../../service/etudiant.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { DomaineService } from '../../../service/domaine.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-etudiant-detail',
  templateUrl: './etudiant-detail.component.html',
  styleUrls: ['./etudiant-detail.component.scss']
})
export class EtudiantDetailComponent implements OnInit {
  public static etudiant: any;
  private myForm: FormGroup;
  public static pays: any;
  numeroEtudiant: any;
      nom: any;
      prenom: any;
      sex: any;
      dateNaissance: any;
      lieuNaissance: any;
      nationalite: any;
      email: any;
      emailUbo: any;
      numPortable: any;
      numFixe: any;
      adresse: any;
      codePostal:  any;
      ville: any;
      paysOrigine: any;
      universiteOrigine: any;
      groupeTp: any;
      groupeAnglais: any;
      promotion: any;
  constructor(private etudiantService: EtudiantService, public datepipe: DatePipe, private router: Router, private route: ActivatedRoute) {
    if(EtudiantDetailComponent.etudiant == undefined){
      router.navigateByUrl('/Promotion')
      return;
    }
    this.myForm = new FormGroup({
      numeroEtudiant: new FormControl(),
      nom: new FormControl(),
      prenom: new FormControl(),
      sex: new FormControl(),
      dateNaissance: new FormControl(),
      lieuNaissance: new FormControl(),
      nationalite: new FormControl(),
      email: new FormControl(),
      emailUbo: new FormControl(),
      numPortable: new FormControl(),
      numFixe: new FormControl(),
      adresse: new FormControl(),
      codePostal: new FormControl(),
      ville: new FormControl(),
      paysOrigine: new FormControl(),
      universiteOrigine: new FormControl(),
      groupeTp: new FormControl(),
      groupeAnglais: new FormControl(),
    })
    this.numeroEtudiant= EtudiantDetailComponent.etudiant['noEtudiant'];
    this.nom= EtudiantDetailComponent.etudiant['nom'];
    this. prenom= EtudiantDetailComponent.etudiant['prenom'];
    this. sex= EtudiantDetailComponent.etudiant['sexe']=="F"? "Madame" : "Monsieur";
    this. dateNaissance= this.datepipe.transform(new Date(EtudiantDetailComponent.etudiant['dateNaissance']), 'dd/MM/yyyy');    
    this. lieuNaissance= EtudiantDetailComponent.etudiant['lieuNaissance'];
    this. nationalite= EtudiantDetailComponent.etudiant['nationalite'];
    this. email= EtudiantDetailComponent.etudiant['email'];
    this. emailUbo= EtudiantDetailComponent.etudiant['emailUbo'];
    this. numPortable= EtudiantDetailComponent.etudiant['mobile'];
    this. numFixe= EtudiantDetailComponent.etudiant['telephone'];
    this. adresse= EtudiantDetailComponent.etudiant['adresse'];
    this. codePostal= EtudiantDetailComponent.etudiant['codePostal'];
    this. ville= EtudiantDetailComponent.etudiant['ville'];
    this. paysOrigine= EtudiantDetailComponent.etudiant['paysOrigine'];
    this. paysOrigine= EtudiantDetailComponent.pays.find(p=> p.code = EtudiantDetailComponent.etudiant['paysOrigine']).signification;
    this. universiteOrigine= EtudiantDetailComponent.etudiant['universiteOrigine'];
    this. groupeTp= EtudiantDetailComponent.etudiant['groupeTp'];
    this. groupeAnglais= EtudiantDetailComponent.etudiant['groupeAnglais'];
  }
  ngOnInit() {
  }

}
