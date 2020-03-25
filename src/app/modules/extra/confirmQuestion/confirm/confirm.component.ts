import { Component, OnInit, Inject } from '@angular/core';
import { QualificatifService } from 'src/app/service/qualificatif.service';
import { QuestionService } from 'src/app/service/question.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ListCComponent } from '../../../questions/list/list-c/list-c.component';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public error: boolean = false;
  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    private router: Router, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }

  delete() {
    if(this.data.entity = "Question"){
      console.log("dkhelt else");
      let  id = this.data.id;
      let service : QuestionService = this.data.service;
      let father : ListCComponent= this.data.father;
      service.delete(id).subscribe((res)=>{
        if (res) {
          console.log("dkhelt vrai ");
          this.router.navigateByUrl('/Questions');
          father.getAllQuestion();
          this.dialogRef.close();
        } else {
          this.error=true;
         
        }
      });
    }
  }
}
