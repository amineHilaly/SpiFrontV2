import { Component, OnInit, Inject } from '@angular/core';
import { QualificatifService } from 'src/app/service/qualificatif.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { QualificatifComponent } from '../../qualificatif/qualificatif/qualificatif.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  public error: boolean = false;
  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,
    private router: Router, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }




  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    if (this.data.entity = "Qualificatif") {
      let  id = this.data.id;
      let service : QualificatifService= this.data.service;
      let father : QualificatifComponent= this.data.father;
      service.delete(id).subscribe((res)=>{
        if (res) {
          this.router.navigateByUrl('/Qualificatif');
          father.getQualificatifs();
          this.dialogRef.close();
        } else {
          this.error = true;
        }
      });
    } else {

    }
  }
}
