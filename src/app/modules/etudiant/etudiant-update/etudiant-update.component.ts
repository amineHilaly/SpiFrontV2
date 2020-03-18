import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../../../service/etudiant.service';
import { DomaineService } from '../../../service/domaine.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-etudiant-update',
  templateUrl: './etudiant-update.component.html',
  styleUrls: ['./etudiant-update.component.scss']
})


export class EtudiantUpdateComponent implements OnInit {
  registerForm: FormGroup;
  public static etudiant: any;
  name = new FormControl(null);
  pays: any = [];
  univOrigin: any[];
  promotion: any[];
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
  codePostal: any;
  ville: any;
  paysOrigine: any;
  universiteOrigine: any;
  groupeTp: any;
  groupeAnglais: any;
  promotionSelected: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantService,
    private domaine: DomaineService,


  ) {

    domaine.getPays().subscribe((data) => {
      this.pays = data;
    });


    domaine.getUniversites().subscribe((data) => {
      this.univOrigin = data;
    });

    domaine.getPromotions().subscribe((data) => {
      this.promotion = data;
    });
    if(EtudiantUpdateComponent.etudiant == undefined){
      router.navigateByUrl('/Etudiant/etudiants')
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
      promotion: new FormControl()
    })
    this.numeroEtudiant= EtudiantUpdateComponent.etudiant['noEtudiant'];
    this.nom= EtudiantUpdateComponent.etudiant['nom'];
    this. prenom= EtudiantUpdateComponent.etudiant['prenom'];
    this. sex= EtudiantUpdateComponent.etudiant['sexe'];
    this. dateNaissance=  new Date(EtudiantUpdateComponent.etudiant['dateNaissance']);
    this. lieuNaissance= EtudiantUpdateComponent.etudiant['lieuNaissance'];
    this. nationalite= EtudiantUpdateComponent.etudiant['nationalite'];
    this. email= EtudiantUpdateComponent.etudiant['email'];
    this. emailUbo= EtudiantUpdateComponent.etudiant['emailUbo'];
    this. numPortable= EtudiantUpdateComponent.etudiant['mobile'];
    this. numFixe= EtudiantUpdateComponent.etudiant['telephone'];
    this. adresse= EtudiantUpdateComponent.etudiant['adresse'];
    this. codePostal= EtudiantUpdateComponent.etudiant['codePostal'];
    this. ville= EtudiantUpdateComponent.etudiant['ville'];
    this. paysOrigine= EtudiantUpdateComponent.etudiant['paysOrigine'];
    this. universiteOrigine= EtudiantUpdateComponent.etudiant['universiteOrigine'];
    this. groupeTp= EtudiantUpdateComponent.etudiant['groupeTp'];
    this. groupeAnglais= EtudiantUpdateComponent.etudiant['groupeAnglais'];
    this. promotionSelected= EtudiantUpdateComponent.etudiant['promotion']['promotionPK']['anneeUniversitaire'] + ' ' + EtudiantUpdateComponent.etudiant['promotion']['promotionPK']['formation']['codeFormation'];
    console.log(EtudiantUpdateComponent.etudiant);
    

  }


  myForm = new FormGroup({
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
    promotion: new FormControl()




  })
  submit(): void {
    console.log(this.myForm.controls['nom'].value);
    if (!(this.myForm.controls['numeroEtudiant'].value == null || this.myForm.controls['nom'].value == null ||
      this.myForm.controls['prenom'].value == null || this.myForm.controls['sex'].value == null ||
      this.myForm.controls['dateNaissance'].value == null || this.myForm.controls['lieuNaissance'].value == null ||
      this.myForm.controls['nationalite'].value == null || this.myForm.controls['email'].value == null ||
      this.myForm.controls['emailUbo'].value == null || this.myForm.controls['numPortable'].value == null ||
      this.myForm.controls['numFixe'].value == null || this.myForm.controls['adresse'].value == null ||
      this.myForm.controls['codePostal'].value == null || this.myForm.controls['ville'].value == null ||
      this.myForm.controls['paysOrigine'].value == null || this.myForm.controls['universiteOrigine'].value == null ||
      this.myForm.controls['groupeTp'].value == null || this.myForm.controls['groupeAnglais'].value == null ||
      this.myForm.controls['promotion'].value == null
    )) {
      let promotion = this.myForm.controls['promotion'].value;
      let i = promotion.indexOf(' ');
      let formation = promotion.substring(0, i);


      let annee = promotion.substring(i + 1, promotion.length);
      let etudiant = ({
        noEtudiant: this.myForm.controls['numeroEtudiant'].value,
        nom: this.myForm.controls['nom'].value,
        prenom: this.myForm.controls['prenom'].value,
        sexe: this.myForm.controls['sex'].value,
        dateNaissance: this.myForm.controls['dateNaissance'].value,
        lieuNaissance: this.myForm.controls['lieuNaissance'].value,
        nationalite: this.myForm.controls['nationalite'].value,
        email: this.myForm.controls['email'].value,
        emailUbo: this.myForm.controls['emailUbo'].value,
        mobile: this.myForm.controls['numPortable'].value,
        telephone: this.myForm.controls['numFixe'].value,
        adresse: this.myForm.controls['adresse'].value,
        codePostal: this.myForm.controls['codePostal'].value,
        ville: this.myForm.controls['ville'].value,
        paysOrigine: this.myForm.controls['paysOrigine'].value,
        universiteOrigine: this.myForm.controls['universiteOrigine'].value,
        groupeTp: this.myForm.controls['groupeTp'].value,
        groupeAnglais: this.myForm.controls['groupeAnglais'].value,
        promotion: {
          promotionPK: {
            anneeUniversitaire: annee,
            formation: {
              codeFormation: formation
            }
          }

        }
      })

      this.etudiantService.save(etudiant).subscribe((data) => {
        this.gotoEtudiantList();
      });
    } else {
      alert("champs vides");
    }


  }



  gotoEtudiantList() {
    this.router.navigate(['/Etudiant/etudiants']);
  }
  ngOnInit() {

  }




}
