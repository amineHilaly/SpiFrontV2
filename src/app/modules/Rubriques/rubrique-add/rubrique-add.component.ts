import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RubriqueService } from 'src/app/service/rubrique.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rubrique-add',
  templateUrl: './rubrique-add.component.html',
  styleUrls: ['./rubrique-add.component.scss']
})
export class RubriqueAddComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, public rubriqueService:RubriqueService , private router: Router) { }
  


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      designation: ['', [Validators.required, Validators.maxLength(16)]],
      ordre: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      type: ['', Validators.required],
  }
    );
  
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

    console.log("avant test");
    this.submitted = true;
    let body = {
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

      
      this.rubriqueService.create(body).subscribe(
        (res: boolean) => {
          if (res) {
            console.log("test");
            this.router.navigateByUrl('/Rubriques');
          }else{
          }
        }
      );

  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }


}
