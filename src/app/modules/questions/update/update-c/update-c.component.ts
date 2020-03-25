import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ɵangular_packages_forms_forms_q } from '@angular/forms';
import { QuestionService } from 'src/app/service/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QualificatifService } from 'src/app/service/qualificatif.service';


@Component({
  selector: 'app-update-c',
  templateUrl: './update-c.component.html',
  styleUrls: ['./update-c.component.scss']
})
export class UpdateCComponent implements OnInit {
  public static question: any;
  private myForm: FormGroup;

  qualificatifs: any[];
  error: boolean = false;
  intitule: any;
  type: any;
  noEnseignant: any;
  qualificatif: any;
  min: any;
  max: any;
  idQuestion: any;
  messages = [{
    text: "un ou plusieurs champs sont vides.",
    exists: false
  }, {
    text: "un ou plusieurs champs sont remplis par des valeurs trop longues.",
    exists: false
  },
  {
    text: "l'intitulé est dèjà existant ",
    exists: false
  }]

  fields = ['intitule',  'qualificatif'];
  isNotNullable = [true, true];
  sizes = [64, -1];
  constructor(public questionService: QuestionService, private router: Router, private route: ActivatedRoute, private qualificatifS: QualificatifService,
  ) {
    qualificatifS.getAll().subscribe((data) => {
      this.qualificatifs = data;
    });

    if (UpdateCComponent.question == undefined) {
      router.navigateByUrl('/Questions')
      return;
    }

  }

  ngOnInit() {
    console.log("dkhelt l init");
    this.myForm = new FormGroup({
      intitule: new FormControl(),
      type: new FormControl(),
      noEnseignant: new FormControl(),
      qualificatif: new FormControl(),
      min: new FormControl(),
      max: new FormControl()
    });
    this.intitule = UpdateCComponent.question['intitule'];
    console.log(UpdateCComponent.question);
    this.type = UpdateCComponent.question['type'];
    this.noEnseignant = "Philippe Saliou";
    this.qualificatif = UpdateCComponent.question['qualificatif'];
    this.max = this.qualificatif['max'];
    this.min = this.qualificatif['min'];

  }

  submit(): void {
    this.error = false;
    for (let m of this.messages) {
      m.exists = false;
    }
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
        (document.querySelector('#'+this.fields[i]) as HTMLInputElement).style.borderColor = '';
      }
    }
    if (this.error) {
      return;
    }
    let idQualificatif= this.myForm.controls['qualificatif'].value;
    let maximal;
    let minimal;
            for(let q of this.qualificatifs){
        if(q.idQualificatif== idQualificatif)
        {

          maximal= q.maximal;
          minimal = q.minimal;
        }

}
    let newqualif = {
      idQualificatif: this.myForm.controls['qualificatif'].value,
      maximal: maximal, 
      minimal: minimal

    }
     console.log(newqualif);
     console.log(this.qualificatifs);
    let newQuestion = {
      idQuestion: UpdateCComponent.question.idQuestion,
      intitule: this.myForm.controls['intitule'].value,
      type: this.myForm.controls['type'].value,
      noEnseignant: null,
      qualificatif: newqualif

    }
    this.questionService.update(newQuestion).subscribe((res) => {
      console.log(newQuestion);
      if (res) {
        this.router.navigateByUrl('/Questions');

      } else {
        this.messages[2].exists = true;
      }
    });
  }

}
