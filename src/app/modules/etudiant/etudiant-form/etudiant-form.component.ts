import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../../../service/etudiant.service';
import { Etudiant } from '../../../service/etudiant';
import { DomaineService } from '../../../service/domaine.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  styleUrls: ['./etudiant-form.component.scss']
})


export class EtudiantFormComponent implements OnInit {
  registerForm: FormGroup;
  etudiant: Etudiant;
  name = new FormControl(null);
  pays: any = [];
  univOrigin: any[];
  promition: any = {};
  message: string = "";
  error: boolean = false;
  fields = ['numeroEtudiant', 'nom', 'prenom', "sex", 'dateNaissance', 'lieuNaissance', 'nationalite', 'email',
    'emailUbo', 'numPortable', 'numFixe', 'adresse', 'codePostal', 'ville', 'paysOrigine', 'universiteOrigine',
    'groupeTp', 'groupeAnglais'];
  isNotNullable = [true, true, true, true, true, true, true, true, false, false, false, true, false, true, true, true, false, false];
  sizes = [50, 50, 50, 1, -1, 255, 50, 255, 255, 20, 20, 255, 10, 255, 5, 6, -1, -1];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantService,
    private domaine: DomaineService,


  ) {
    this.etudiant = new Etudiant();

    domaine.getPays().subscribe((data) => {
      this.pays = data;
    });


    domaine.getUniversites().subscribe((data) => {
      this.univOrigin = data;
    });


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
    (document.querySelector('#dateNaissance') as HTMLInputElement).style.borderColor = '';
    for (let i = 0; i < this.fields.length; i++) {      
      if (( this.isNotNullable[i] && (this.myForm.controls[this.fields[i]].value == null || this.myForm.controls[this.fields[i]].value == '')) ||
        ( this.sizes[i] > 0 && this.myForm.controls[this.fields[i]].value!=null && this.myForm.controls[this.fields[i]].value.length > this.sizes[i])) {
        this.error = true;
        (document.querySelector('#'+this.fields[i]) as HTMLInputElement).style.borderColor = 'red';
        if (( this.isNotNullable[i] && (this.myForm.controls[this.fields[i]].value == null || this.myForm.controls[this.fields[i]].value == ''))) {
          this.message = "un ou plusieur champ sont vides";
        } else {
          this.message = "un ou plusieur champ sont remplis par des valeurs trop longues (maixmum 16 caractères)";
        }
      } else {
        (document.querySelector('#'+this.fields[i]) as HTMLInputElement).style.borderColor = '';
      }
    }
    if (this.error){
      return;
    }
    if(new Date(this.myForm.controls['dateNaissance'].value).getTime() > new Date().getTime()){
      this.error = true;
      this.message = "la date est mal remplis";
      (document.querySelector('#dateNaissance') as HTMLInputElement).style.borderColor = 'red';
    }
    if (this.error){
      return;
    }
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
      groupeAnglais: this.myForm.controls['groupeAnglais'].value
    })
    console.log(etudiant)
    this.etudiantService.save(etudiant).subscribe((data) => {
      this.gotoEtudiantList();
    });
  }



  gotoEtudiantList() {
    this.router.navigate(['/Etudiant/etudiants']);
  }
  ngOnInit() {

  }




}
