import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RubriqueService } from 'src/app/service/rubrique.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rubrique-add',
  templateUrl: './rubrique-add.component.html',
  styleUrls: ['./rubrique-add.component.scss']
})
export class RubriqueAddComponent implements OnInit {

  error : boolean=false;
  messages = [{
    text:"un ou plusieur champ sont vides.",
    exists:false
  },{
    text:"un ou plusieur champ sont remplis par des valeurs trop longues. (maximum 16 caractères)",
    exists:false
  },{
    text:"Erreur de l'insertion.",
    exists:false
  }]
  myForm = new FormGroup({
    Designation:new FormControl(),
    Type:new FormControl(),
    Ordre:new FormControl()
 });
  
  constructor(public qualificatifService:RubriqueService , private router: Router) { }

  ngOnInit() {
  
  }

  submit() : void{
    
    let body = {
      designation: this.myForm.controls['Designation'].value,
      type:this.myForm.controls['Type'].value,
      ordre:this.myForm.controls['Ordre'].value  
    }
    this.qualificatifService.create(body).subscribe(
      (res: boolean) => {
        if (res) {
          this.router.navigateByUrl('/Rubriques');
        }else{
          this.error = true;
          this.messages[2].exists =true;
        }
      }
    );
  }


}
