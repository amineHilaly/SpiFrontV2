import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../../../service/evaluation.service';
import { DomaineService } from '../../../service/domaine.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PromotionService } from 'src/app/service/promotion.service';

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
  codeFormation: any[];
  codeUe: any[];
  ela = 'ELA';

  elementConstitutif = {
    id: {
      "codeEc": this.codeEc,
      "codeFormation": this.codeFormation,
      "codeUe": this.codeUe
    }
  }

  uniteEnseignement = {
    id: {
      "codeFormation": this.codeFormation,
      "codeUe": this.codeUe
    }
  }

  myPromotion;
  messages = [{
    text: "un ou plusieurs champs sont vides.",
    exists: false
  }, {
    text: "un ou plusieurs champs sont remplis par des valeurs trop longues.",
    exists: false
  }, {
    text: "les dates ne sont pas bien remplies",
    exists: false
  }, {
    text: "Evaluation existe déja pour cette UE.",
    exists: false
  }]
  error: boolean = false;
  fields = ['designation', "periode", "debutReponse", "finReponse", "ue"];
  isNotNullable = [true, false, true, true, true];
  sizes = [16, 64, -1, -1];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluationService: EvaluationService,
    private promotionService: PromotionService

  ) {
    let annee = this.route.snapshot.paramMap.get('annee');
    let codeformation = this.route.snapshot.paramMap.get('codeformation');
    this.getPromotion(annee, codeformation);
    this.myForm.get('ec').disable();
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

    this.promotionService.getdetailPromotion(promotionPK).subscribe(data => {
      this.myPromotion = data;

      let cf = this.myPromotion.promotionPK.formation.codeFormation;
      this.evaluationService.getUeBycodeForm(cf).subscribe((data) => {

        this.ueList = data;

      });
    }, err => {
      console.log(err)
    })


  }


  submit(): void {
    for (let m of this.messages) {
      m.exists = false;
    }
    this.error = false;
    for (let i = 0; i < this.fields.length; i++) {
      if ((this.isNotNullable[i] && (this.myForm.controls[this.fields[i]].value == null || this.myForm.controls[this.fields[i]].value == '')) ||
        (this.sizes[i] > 0 && this.myForm.controls[this.fields[i]].value != null && this.myForm.controls[this.fields[i]].value.length > this.sizes[i])) {
        this.error = true;
        (document.querySelector('#' + this.fields[i]) as HTMLInputElement).style.borderColor = 'red';
        if ((this.isNotNullable[i] && (this.myForm.controls[this.fields[i]].value == null || this.myForm.controls[this.fields[i]].value == ''))) {
          this.messages[0].exists = true;
        } else {
          this.messages[1].exists = true;
        }
      } else {
        (document.querySelector('#' + this.fields[i]) as HTMLInputElement).style.borderColor = '';
      }
    }
    if (new Date(this.myForm.controls['debutReponse'].value).getTime() >= new Date(this.myForm.controls['finReponse'].value).getTime()) {
      this.error = true;
      this.messages[2].exists = true;
      (document.querySelector('#debutReponse') as HTMLInputElement).style.borderColor = 'red';
      (document.querySelector('#finReponse') as HTMLInputElement).style.borderColor = 'red';
    } else {
      (document.querySelector('#debutReponse') as HTMLInputElement).style.borderColor = '';
      (document.querySelector('#finReponse') as HTMLInputElement).style.borderColor = '';
    }

    if (this.error) {
      return;
    }
    let evaluation = ({
      designation: this.myForm.controls['designation'].value,
      etat: this.myForm.controls['etat'].value,
      periode: this.myForm.controls['periode'].value,
      debutReponse: this.myForm.controls['debutReponse'].value,
      finReponse: this.myForm.controls['finReponse'].value,
      uniteEnseignement: {
        id: {
          codeFormation: this.myPromotion.promotionPK.formation.codeFormation,
          codeUe: this.myForm.controls['ue'].value
        }
      },
      elementConstitutif: {
        id: {
          codeFormation: this.myPromotion.promotionPK.formation.codeFormation,
          codeUe: this.myForm.controls['ue'].value,
          codeEc: this.myForm.controls['ec'].value
        }
      },
      promotion: this.myPromotion
    })
    this.evaluationService.save(evaluation).subscribe((res) => {
      if (res) {
        let promotionParam = this.myPromotion;
        this.router.navigateByUrl('Evaluation/' + promotionParam.promotionPK.anneeUniversitaire + "/" + promotionParam.promotionPK.formation.codeFormation);
      } else {
        this.error = true;
        this.messages[3].exists = true;
      }
    });
  }

  onChange(par) {
    let cf = this.myPromotion.promotionPK.formation.codeFormation;
    this.evaluationService.getEcBycodeForm(cf, par).subscribe((data) => {
      console.log(cf, par);
      this.ecList = data;
      console.log(this.ecList);

      if (this.ecList.length > 0) {
        this.myForm.get('ec').enable();
      } else {
        this.myForm.get('ec').disable();
      }
    });
  }

  ngOnInit() {

  }
}
