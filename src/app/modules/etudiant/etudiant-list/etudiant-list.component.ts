import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../../../service/etudiant';
import { EtudiantService } from '../../../service/etudiant.service';
import {FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { EtudiantDetailComponent } from '../etudiant-detail/etudiant-detail.component';
import { EtudiantUpdateComponent} from '../etudiant-update/etudiant-update.component'

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.scss']
})
export class EtudiantListComponent implements OnInit {
  registerForm: FormGroup;
    submitted = false;

  myForm = new FormGroup({

    nom : new FormControl()
  })


  etudiants: Etudiant[];
  
  
 
  constructor(private etudiantService: EtudiantService,
    private formBuilder: FormBuilder,
    private router : Router
    ) {
  }
 
  ngOnInit() {
    this.etudiantService.findAll().subscribe(data => {
      this.etudiants = data;
    });


  }

  submit(): void{

    console.log(this.myForm.controls['nom'].value);
    
  }

  update(etudiant){ 
    this.etudiantService.detail(etudiant.noEtudiant).subscribe((data) => {
    etudiant = data;
    EtudiantUpdateComponent.etudiant = data;
          this.router.navigate(['/Etudiant/modif']);
    })
  }





  detail(noEtudiant){
    let etudiant : any;
  this.etudiantService.detail(noEtudiant).subscribe((data) => {
    etudiant = data;
    EtudiantDetailComponent.etudiant = data;
    this.router.navigateByUrl("detail/"+noEtudiant);

  })
  }

  
}
