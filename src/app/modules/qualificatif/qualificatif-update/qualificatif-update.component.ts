import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QualificatifService } from '../../../service/qualificatif.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-qualificatif-update',
  templateUrl: './qualificatif-update.component.html',
  styleUrls: ['./qualificatif-update.component.scss']
})
export class QualificatifUpdateComponent implements OnInit {


  public qualificatif = { max: 'aa', min: 'bb' };
  message : string ="";
  error : boolean=false;
  

  myForm: FormGroup;



  constructor(public qualificatifService: QualificatifService,
    private _Activatedroute: ActivatedRoute,
    private router: Router) {
    this.qualificatif['max'] = this._Activatedroute.snapshot.paramMap.get("max");
    this.qualificatif['min'] = this._Activatedroute.snapshot.paramMap.get("min");
    this.myForm = new FormGroup({
      max: new FormControl(this.qualificatif['max']),
      min: new FormControl(this.qualificatif['min'])
    });

  }

  ngOnInit() {

  }

  submit(): void {
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
      idQualificatif: this._Activatedroute.snapshot.paramMap.get("id"),
      maximal: this.myForm.controls['max'].value,
      minimal: this.myForm.controls['min'].value
    }
    alert("sending");
    this.qualificatifService.update(body).subscribe(
      (res: boolean) => {
        alert("done" + res);
        if (res) {
          this.router.navigateByUrl('/Qualificatif');
        } else {
          this.error = true;
          this.message = "mise a jour impossible : qualificatif referencé dans un ou plusieur question";
        }
      }
    );
  }

}
