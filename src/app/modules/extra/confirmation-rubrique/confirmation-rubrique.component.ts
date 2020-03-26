import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { RubriqueService } from 'src/app/service/rubrique.service';
import { RubriqueComponent } from '../../Rubriques/rubrique/rubrique.component';

@Component({
  selector: 'app-confirmation-rubrique',
  templateUrl: './confirmation-rubrique.component.html',
  styleUrls: ['./confirmation-rubrique.component.scss']
})
export class ConfirmationRubriqueComponent implements OnInit {

  public error: boolean = false;
  constructor(public dialogRef: MatDialogRef<ConfirmationRubriqueComponent>,
    private router: Router, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {

    if (this.data.entity = "Rubrique") {
      let  id = this.data.id;
      let service : RubriqueService = this.data.service;
      let father : RubriqueComponent = this.data.father;
      service.delete(id).subscribe((res)=>{
        if (res) {
          this.router.navigateByUrl('/Rubriques');
          father.getRubriques();
          this.dialogRef.close();
        } else {
          this.error = true;
        }
      });
    } else {

    }
  }

}
