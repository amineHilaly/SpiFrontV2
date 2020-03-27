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
  public rubrique = { designation: '', ordre: '', type: '' };
  message: string = "";
  error: boolean = false;




  constructor(private formBuilder: FormBuilder, public rubriqueService: RubriqueService,
    private _Activatedroute: ActivatedRoute, private router: Router) {
     this.registerForm = this.formBuilder.group({
      designation: [this.rubrique['designation'], [Validators.required, Validators.maxLength(32)]],
      ordre: [this.rubrique['ordre'], [Validators.required, Validators.min(1), Validators.max(99)]],
      type: [this.rubrique['type'], Validators.required],
    }
    );
  }

  ngOnInit() {

    this.rubriqueService.getAll().subscribe((data)=>{
      for (let rubrique of data){
        if(rubrique['idRubrique'] == this._Activatedroute.snapshot.paramMap.get("id")){
          console.log("found");
          this.rubrique['designation'] = rubrique["designation"];
          this.rubrique['ordre'] = rubrique["ordre"];
          this.rubrique['type'] = rubrique["type"];
        }
      }
      this.registerForm = this.formBuilder.group({
        designation: [this.rubrique['designation'], [Validators.required, Validators.maxLength(32)]],
        ordre: [this.rubrique['ordre'], [Validators.required, Validators.min(1), Validators.max(99)]],
        type: [this.rubrique['type'], Validators.required],
      }
      );
    })
    

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;
    let body = {
      idRubrique: this._Activatedroute.snapshot.paramMap.get("id"),
      designation: this.registerForm.controls['designation'].value,
      type: this.registerForm.controls['type'].value,
      ordre: this.registerForm.controls['ordre'].value
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
        } else {
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
