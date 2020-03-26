import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RubriqueService } from 'src/app/service/rubrique.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rubrique-update',
  templateUrl: './rubrique-update.component.html',
  styleUrls: ['./rubrique-update.component.scss']
})
export class RubriqueUpdateComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  public rubrique = { designation :'p', ordre :'o', type :'t'};
  message : string ="";
  error : boolean=false;
  


  constructor(private formBuilder: FormBuilder, public rubriqueService:RubriqueService ,
              private _Activatedroute: ActivatedRoute, private router: Router) {
                
                this.rubrique['designation'] = this._Activatedroute.snapshot.paramMap.get("designation");
                this.rubrique['ordre'] = this._Activatedroute.snapshot.paramMap.get("ordre");
                this.rubrique['type'] = this._Activatedroute.snapshot.paramMap.get("type");
               }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
      designation: [this.rubrique['designation'], [Validators.required, Validators.maxLength(16)]],
      ordre: [this.rubrique['ordre'], [Validators.required, Validators.min(1), Validators.max(99)]],
      type: [this.rubrique['type'], Validators.required],
  }
    );
  
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;
    let body = {
      idRubrique : this._Activatedroute.snapshot.paramMap.get("id"),
      designation: this.registerForm.controls['designation'].value,
      type:this.registerForm.controls['type'].value,
      ordre:this.registerForm.controls['ordre'].value  
    }
    

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      else { 
      }

      
      this.rubriqueService.update(body).subscribe(
        (res: boolean) => {
          if (res) {
            this.router.navigateByUrl('/Rubriques');
          }else{
            this.message = "Cette Rubrique est déjà référencée";
            this.error = true;
          }
        }
      );

  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }


}
