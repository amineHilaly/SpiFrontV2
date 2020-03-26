import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../../../service/etudiant.service';
import { DomaineService } from '../../../service/domaine.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EtudiantDetailComponent } from '../etudiant-detail/etudiant-detail.component';

@Component({
  selector: 'app-etudiant-update',
  templateUrl: './etudiant-update.component.html',
  styleUrls: ['./etudiant-update.component.scss']
})


export class EtudiantUpdateComponent implements OnInit {
  public static etudiant: any;
  private myForm: FormGroup;
  public static pays: any;
  public static univOrigin: any;
  private sexes = [{
    code :'M',
    signification:'Monsieur'
  },{
    code :'F',
    signification:'Madame'
  }]
  private myUnivs;
  private myPays;
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
  universiteOrigineSig;
  groupeTp: any;
  groupeAnglais: any;
  static promotion: any;
  messages = [{
    text:"un ou plusieurs champs sont vides.",
    exists:false
  },{
    text:"un ou plusieurs champs sont remplis par des valeurs trop longues.",
    exists:false
  },{
    text:"date n'est pas bien remplie",
    exists:false
  },{
    text:"le groupe Tp doit étre égale à 1, 2 ou vide.",
    exists:false
  },{
    text:"le groupe Anglais doit étre égale à 1, 2 ou vide.",
    exists:false
  },{
    text:"Erreur de modification.",
    exists:false
  }]

  
  error = false;
  fields = [ 'nom', 'prenom', "sex", 'dateNaissance', 'lieuNaissance', 'nationalite', 'email',
    'emailUbo', 'numPortable', 'numFixe', 'adresse', 'codePostal', 'ville', 'paysOrigine', 'universiteOrigine',
    'groupeTp', 'groupeAnglais'];
  isNotNullable = [ true, true, true, true, true, true, true, false, false, false, true, false, true, true, true, false, false];
  sizes = [50, 50, 1, -1, 255, 50, 255, 255, 20, 20, 255, 10, 255, 5, 6, -1, -1];
  civility: any;
  constructor(private etudiantService: EtudiantService, public datepipe: DatePipe
    , private router: Router, private route: ActivatedRoute) {
    if (EtudiantUpdateComponent.etudiant == undefined) {
      router.navigateByUrl('/Promotion')
      return;
    }
  }

  ngOnInit() {

    this.myUnivs = EtudiantUpdateComponent.univOrigin;
    this.myPays = EtudiantUpdateComponent.pays;
    this.sex = EtudiantUpdateComponent.etudiant['sexe'];
    console.log(this.sex);
    
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
    this.numeroEtudiant = EtudiantUpdateComponent.etudiant['noEtudiant'];
    this.nom = EtudiantUpdateComponent.etudiant['nom'];
    this.prenom = EtudiantUpdateComponent.etudiant['prenom'];
    this.sex = EtudiantUpdateComponent.etudiant['sexe'];
    this.dateNaissance = new Date(EtudiantUpdateComponent.etudiant['dateNaissance']);
    this.lieuNaissance = EtudiantUpdateComponent.etudiant['lieuNaissance'];
    this.nationalite = EtudiantUpdateComponent.etudiant['nationalite'];
    this.email = EtudiantUpdateComponent.etudiant['email'];
    this.emailUbo = EtudiantUpdateComponent.etudiant['emailUbo'];
    this.numPortable = EtudiantUpdateComponent.etudiant['mobile'];
    this.numFixe = EtudiantUpdateComponent.etudiant['telephone'];
    this.adresse = EtudiantUpdateComponent.etudiant['adresse'];
    this.codePostal = EtudiantUpdateComponent.etudiant['codePostal'];
    this.ville = EtudiantUpdateComponent.etudiant['ville'];
    this.paysOrigine = EtudiantUpdateComponent.etudiant['paysOrigine'];
    this.universiteOrigine = EtudiantUpdateComponent.etudiant['universiteOrigine'];
    this.universiteOrigineSig = EtudiantUpdateComponent.univOrigin.find(u => u.code == this.universiteOrigine).signification;
    this.groupeTp = EtudiantUpdateComponent.etudiant['groupeTp'];
    this.groupeAnglais = EtudiantUpdateComponent.etudiant['groupeAnglais'];
  }

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
    if (this.error){
      return;
    }
    let newEtudiant = ({
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
      promotion : EtudiantUpdateComponent.promotion
    })
    console.log(newEtudiant)
    this.etudiantService.update(newEtudiant).subscribe((res) => {
      if(res){
        this.router.navigateByUrl('EtudiantsPromotion/'+EtudiantUpdateComponent.promotion.promotionPK.anneeUniversitaire
        +'/'+EtudiantUpdateComponent.promotion.promotionPK.formation.codeFormation);
      }else{
        this.messages[5].exists = true;
      }
    });
  }

}
