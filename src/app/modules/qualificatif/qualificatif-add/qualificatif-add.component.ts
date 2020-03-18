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

  message : string ="";
  error : boolean=false;
  errorMax : boolean=false;
  errorMin : boolean=false;
  myForm = new FormGroup({
    max:new FormControl(),
    min:new FormControl()
 });
  
  constructor(public qualificatifService:QualificatifService , private router: Router) { }

  ngOnInit() {
  
  }

  submit() : void{
    this.error=false;
    if(this.myForm.controls['max'].value == null || this.myForm.controls['max'].value == '' || this.myForm.controls['max'].value.length > 16){
      this.error=true;
      (document.querySelector('#max') as HTMLInputElement).style.borderColor = 'red';
      if(this.myForm.controls['max'].value == null || this.myForm.controls['max'].value == ''){
        this.message = "un ou plusieur champ sont vides";
      }else{
        this.message = "un ou plusieur champ sont remplis par des valeurs trop longues (maixmum 16 caractères)";
      }
    }else{
      (document.querySelector('#max') as HTMLInputElement).style.borderColor = '';
    }

    if(this.myForm.controls['min'].value == null || this.myForm.controls['min'].value == '' || this.myForm.controls['min'].value.length > 16){
      this.error=true;
      (document.querySelector('#min') as HTMLInputElement).style.borderColor = 'red';
      if(this.myForm.controls['min'].value == null || this.myForm.controls['min'].value == '' ){
        this.message = "un ou plusieur champ sont vides";
      }else{
        this.message = "un ou plusieur champ sont remplis par des valeurs trop longues (maixmum 16 caractères)";
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
          this.message = "erreur coté serveur";
        }
      }
    );
  }

}
