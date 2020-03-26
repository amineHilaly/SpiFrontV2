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
  static promotion: any ;
  myPromotion;
  messages = [{
    text:"un ou plusieur champ sont vides.",
    exists:false
  },{
    text:"un ou plusieurs champs sont remplis par des valeurs trop longues.",
    exists:false
  },{
    text:"la date est mal remplis.",
    exists:false
  },{
    text:"groupe Tp doit étre égale à 1, 2 ou vide.",
    exists:false
  },{
    text:"groupe Anglais doit étre égale à 1, 2 ou vide.",
    exists:false
  },{
    text:"le numéro d'étudiant que vous avez choisis existe déja dans notre base de données.",
    exists:false
  },{
    text:"Erreur de l'insertion.",
    exists:false
  }, {
    text:"N° étudiant contient un ou plusieurs espaces.",
    exists:false
  }]
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
    this.myPromotion = EtudiantFormComponent.promotion;
    console.log(this.myPromotion);
    if(EtudiantFormComponent.promotion == null){
      this.router.navigateByUrl('/Promotion');
      return;
    }
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

  })
  submit(): void {
    for(let m of this.messages){
      m.exists = false;
    }
    this.error = false;
    (document.querySelector('#dateNaissance') as HTMLInputElement).style.borderColor = '';
    (document.querySelector('#groupeTp') as HTMLInputElement).style.borderColor = '';
    (document.querySelector('#groupeAnglais') as HTMLInputElement).style.borderColor = '';
    for (let i = 0; i < this.fields.length; i++) {      
      if (( this.isNotNullable[i] && (this.myForm.controls[this.fields[i]].value == null || this.myForm.controls[this.fields[i]].value == '')) ||
        ( this.sizes[i] > 0 && this.myForm.controls[this.fields[i]].value!=null && this.myForm.controls[this.fields[i]].value.length > this.sizes[i])) {
        this.error = true;
        (document.querySelector('#'+this.fields[i]) as HTMLInputElement).style.borderColor = 'red';
        if (( this.isNotNullable[i] && (this.myForm.controls[this.fields[i]].value == null || this.myForm.controls[this.fields[i]].value == ''))) {
          this.messages[0].exists=true;
        } else {
          this.messages[1].exists=true;
        }
      } else {
        (document.querySelector('#'+this.fields[i]) as HTMLInputElement).style.borderColor = '';
      }
    }
    if(new Date(this.myForm.controls['dateNaissance'].value).getTime() > new Date().getTime()){
      this.error = true;
      this.messages[2].exists = true;
      (document.querySelector('#dateNaissance') as HTMLInputElement).style.borderColor = 'red';
    }
    if(this.myForm.controls['groupeTp'].value!=1 && this.myForm.controls['groupeTp'].value!=2 &&
      this.myForm.controls['groupeTp'].value!=null && this.myForm.controls['groupeTp'].value!=''){
      this.error = true;
      this.messages[3].exists = true;
      (document.querySelector('#groupeTp') as HTMLInputElement).style.borderColor = 'red';
    }
    if(this.myForm.controls['groupeAnglais'].value!=1 && this.myForm.controls['groupeAnglais'].value!=2 &&
      this.myForm.controls['groupeAnglais'].value!=null && this.myForm.controls['groupeAnglais'].value!=''){
      this.error = true;
      this.messages[4].exists = true;
      (document.querySelector('#groupeAnglais') as HTMLInputElement).style.borderColor = 'red';
    }
    if( (this.myForm.controls["numeroEtudiant"].value as string).indexOf(' ') >=0){
      this.error = true;
      this.messages[7].exists = true;
      (document.querySelector('#numeroEtudiant') as HTMLInputElement).style.borderColor = 'red';
    }else{
      (document.querySelector('#numeroEtudiant') as HTMLInputElement).style.borderColor = '';
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
      groupeAnglais: this.myForm.controls['groupeAnglais'].value,
      promotion : EtudiantFormComponent.promotion
    })
    this.etudiantService.save(etudiant).subscribe((res) => {
      if(res == 0){
        this.router.navigateByUrl('EtudiantsPromotion/'+this.myPromotion.promotionPK.anneeUniversitaire
        +'/'+this.myPromotion.promotionPK.formation.codeFormation);
      }else if (res == 1){
        this.error=true;
        this.messages[5].exists=true;
      }else{
        this.error=true;
        this.messages[6].exists=true;
      }
    });
  }

  ngOnInit() {

  }
}
