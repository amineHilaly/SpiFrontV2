import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionService } from 'src/app/service/question.service';
import { Router,ActivatedRoute } from '@angular/router';
import { QualificatifService } from 'src/app/service/qualificatif.service';

@Component({
  selector: 'app-add-c',
  templateUrl: './add-c.component.html',
  styleUrls: ['./add-c.component.scss']
})
export class AddCComponent implements OnInit {

  qualificatifs: any[];
  error : boolean=false;
  type='QUS'
  messages = [{
    text:"un ou plusieur champ sont vides.",
    exists:false
  },{
    text:"un ou plusieurs champs sont remplis par des valeurs trop longues. ",
    exists:false
  },
  {
    text:"l'intitulé est dèjà existant ",
    exists:false
  }]
  myForm = new FormGroup({
    intitule:new FormControl(),
    type:new FormControl(),
    noEnseignant:new FormControl(),
    qualificatif:new FormControl(),
    min:new FormControl(),
    max:new FormControl()
 });
 fields = ['intitule', 'qualificatif'];
 isNotNullable = [true, true];
  sizes = [64,  -1];
  constructor(public questionService:QuestionService , private router: Router,private route: ActivatedRoute,private qualificatif: QualificatifService,
    ) { 
     qualificatif.getAll().subscribe((data) => {
        this.qualificatifs = data;
      });
     


    }

  ngOnInit() {
  }
  
  submit() : void{
    this.error=false;
    for (let m of this.messages){
      m.exists =false;
    }
    for (let i = 0; i < this.fields.length; i++) {   
      console.log(this.fields[i]);   
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
    if(this.error){
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
    
    let body = {
      intitule: this.myForm.controls['intitule'].value,
      type:this.myForm.controls['type'].value,
      noEnseignant:null,
      qualificatif:newqualif

    }
    this.questionService.create(body).subscribe(
      (res: boolean) => {
        if (res) {
          this.router.navigateByUrl('/Questions');
        }else{
          this.error = true;
          this.messages[2].exists =true;
        }
      }
    );
  }

}
