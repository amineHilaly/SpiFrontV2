import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../../../service/evaluation.service';
import { DomaineService } from '../../../service/domaine.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-evaluation-add',
  templateUrl: './evaluation-add.component.html',
  styleUrls: ['./evaluation-add.component.scss']
})
export class EvaluationAddComponent implements OnInit {

  registerForm: FormGroup;
  evaluation: any[];
  name = new FormControl(null);
  ueList: any[];
  ecList: any[];
  codeEc: any[];
  codeFormation:any[];
  codeUe:any[];
  static promotion: any ;

  elementConstitutif= {
      id: {
        "codeEc": this.codeEc,
        "codeFormation": this.codeFormation,
        "codeUe": this.codeUe
      }
    }

    uniteEnseignement={
      id:{
        "codeFormation": this.codeFormation,
      "codeUe": this.codeUe
      }
    }
    
  myPromotion;
  messages = [{
    text:"un ou plusieur champ sont vides.",
    exists:false
  },{
    text:"un ou plusieur champ sont remplis par des valeurs trop longues.",
    exists:false
  },{
    text:"la date est mal remplis.",
    exists:false
  },{
    text:"Erreur de l'insertion.",
    exists:false
  }]
  error: boolean = false;
  fields = ['designation', 'codeFormation', 'etat', "periode", 'debutReponse', 'finReponse', 'anneeUniversitaire', 'ue',
    'ec'];
  isNotNullable = [true, true, true, true, true, true, true, true, false];
  sizes = [50, 50, 50, 1, -1, 255, 50, 255, 255];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluationService: EvaluationService,
    private domaine: DomaineService,


  ) {
    this.myPromotion = EvaluationAddComponent.promotion;
    console.log(this.myPromotion);
 
    evaluationService.getUeBycodeForm().subscribe((data) => {
      this.ueList = data;
    });


    evaluationService.getEcBycodeForm().subscribe((data) => {
      this.ecList = data;
    });


  }


  myForm = new FormGroup({
    designation: new FormControl(),
    codeFormation: new FormControl(),
    etat: new FormControl(),
    periode: new FormControl(),
    debutReponse: new FormControl(),
    finReponse: new FormControl(),
    anneeUniversitaire: new FormControl(),
    ue: new FormControl(),
    ec: new FormControl(),
    

  })
  submit(): void {
    for(let m of this.messages){
      m.exists = false;
    }
    this.error = false;
    //(document.querySelector('#debutReponse') as HTMLInputElement).style.borderColor = '';
    //(document.querySelector('#finReponse') as HTMLInputElement).style.borderColor = '';
    //(document.querySelector('#etat') as HTMLInputElement).style.borderColor = '';
    for (let i = 0; i < this.fields.length; i++) {      
      if (( this.isNotNullable[i] && (this.myForm.controls[this.fields[i]].value == null || this.myForm.controls[this.fields[i]].value == '')) ||
        ( this.sizes[i] > 0 && this.myForm.controls[this.fields[i]].value!=null && this.myForm.controls[this.fields[i]].value.length > this.sizes[i])) {
        this.error = true;
        //(document.querySelector('#'+this.fields[i]) as HTMLInputElement).style.borderColor = 'red';
        if (( this.isNotNullable[i] && (this.myForm.controls[this.fields[i]].value == null || this.myForm.controls[this.fields[i]].value == ''))) {
          this.messages[0].exists=true;
        } else {
          this.messages[1].exists=true;
        }
      } else {
       // (document.querySelector('#'+this.fields[i]) as HTMLInputElement).style.borderColor = '';
      }
    }
    if(new Date(this.myForm.controls['debutReponse'].value).getTime() > new Date().getTime() ||
    	new Date(this.myForm.controls['finReponse'].value).getTime() > new Date().getTime()){
      this.error = true;
      this.messages[2].exists = true;
      //(document.querySelector('#debutReponse') as HTMLInputElement).style.borderColor = 'red';
    }
    if(this.myForm.controls['finReponse'].value!=1 && this.myForm.controls['finReponse'].value!=2 &&
      this.myForm.controls['finReponse'].value!=null && this.myForm.controls['finReponse'].value!=''){
      this.error = true;
      this.messages[3].exists = true;
      //(document.querySelector('#finReponse') as HTMLInputElement).style.borderColor = 'red';
    }
    if(this.myForm.controls['etat'].value!=1 && this.myForm.controls['etat'].value!=2 &&
      this.myForm.controls['etat'].value!=null && this.myForm.controls['etat'].value!=''){
      this.error = true;
      this.messages[4].exists = true;
      //(document.querySelector('#etat') as HTMLInputElement).style.borderColor = 'red';
    }
    if (this.error){
      return;
    }
    let evaluation = ({
      designation: this.myForm.controls['designation'].value,
      codeFormation: this.myForm.controls['codeFormation'].value,
      etat: this.myForm.controls['etat'].value,
      periode: this.myForm.controls['periode'].value,
      debutReponse: this.myForm.controls['debutReponse'].value,
      finReponse: this.myForm.controls['finReponse'].value,
      anneeUniversitaire: this.myForm.controls['anneeUniversitaire'].value,
      uniteEnseignement: this.myForm.controls['ue'].value,
      elementConstitutif: this.myForm.controls['ec'].value,
      promotion : EvaluationAddComponent.promotion
      //promotion : EvaluationAddComponent.promotion
    })
    this.evaluationService.save(evaluation).subscribe((res) => {
      if(res == 0){
        this.router.navigateByUrl('Evaluation');
      }else if (res == 1){
        this.error=true;
        this.messages[3].exists=true;
      }else{
        this.error=true;
        this.messages[4].exists=true;
      }
    });
  }

  ngOnInit() {

  }
}
