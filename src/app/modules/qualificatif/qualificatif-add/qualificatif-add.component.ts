import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QualificatifService } from '../../../service/qualificatif.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qualificatif-add',
  templateUrl: './qualificatif-add.component.html',
  styleUrls: ['./qualificatif-add.component.scss']
})
export class QualificatifAddComponent implements OnInit {

  error : boolean=false;
  messages = [{
    text:"un ou plusieur champ sont vides.",
    exists:false
  },{
    text:"un ou plusieurs champs sont remplis par des valeurs trop longues. (maximum 16 caractères)",
    exists:false
  },{
    text:"Erreur de l'insertion.",
    exists:false
  }]
  myForm = new FormGroup({
    max:new FormControl(),
    min:new FormControl()
 });
  
  constructor(public qualificatifService:QualificatifService , private router: Router) { }

  ngOnInit() {
  
  }

  submit() : void{
    this.error=false;
    for (let m of this.messages){
      m.exists =false;
    }
    if(this.myForm.controls['max'].value == null || this.myForm.controls['max'].value.trim() == '' || this.myForm.controls['max'].value.length > 16){
      this.error=true;
      (document.querySelector('#max') as HTMLInputElement).style.borderColor = 'red';
      if(this.myForm.controls['max'].value == null || this.myForm.controls['max'].value.trim() == ''){
        this.messages[0].exists = true;
      }else{
        this.messages[1].exists = true;      }
    }else{
      (document.querySelector('#max') as HTMLInputElement).style.borderColor = '';
    }

    if(this.myForm.controls['min'].value == null || this.myForm.controls['min'].value.trim() == '' || this.myForm.controls['min'].value.length > 16){
      this.error=true;
      (document.querySelector('#min') as HTMLInputElement).style.borderColor = 'red';
      if(this.myForm.controls['min'].value == null || this.myForm.controls['min'].value.trim() == '' ){
        this.messages[0].exists = true;
      }else{
        this.messages[1].exists = true;
      }
    }else{
      (document.querySelector('#min') as HTMLInputElement).style.borderColor = '';
    }
    if(this.error){
      return;
    }


    let body = {
      maximal: this.myForm.controls['max'].value,
      minimal:this.myForm.controls['min'].value  
    }
    this.qualificatifService.create(body).subscribe(
      (res: boolean) => {
        if (res) {
          this.router.navigateByUrl('/Qualificatif');
        }else{
          this.error = true;
          this.messages[2].exists =true;
        }
      }
    );
  }

}
