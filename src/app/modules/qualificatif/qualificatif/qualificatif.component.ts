import { Component, OnInit } from '@angular/core';
import { QualificatifService } from '../../../service/qualificatif.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule, MatDialog, MatDialogRef } from '@angular/material';
import { QualificatifUpdateComponent } from '../qualificatif-update/qualificatif-update.component';
import { ConfirmationComponent } from '../../extra/confirmation/confirmation.component';



@Component({
  selector: 'app-posts',
  templateUrl: './qualificatif.component.html',
  styleUrls: ['./qualificatif.component.scss']
})
export class QualificatifComponent implements OnInit {


  qualificatifs:any = [];

  constructor(public qualificatifService:QualificatifService,private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getQualificatifs();
  }

  getQualificatifs() {
    this.qualificatifs = [];
    this.qualificatifService.getAll().subscribe((data: {}) => {
      this.qualificatifs = data;
    });
  }

  delete(id) : void {
    this.dialog.open(ConfirmationComponent,{
      data: {
        entity : "Qualificatif",
        id : id,
        service : this.qualificatifService,
        father : this
      }
    });
  }


  update(qualificatif) : void {
    this.router.navigateByUrl('/Qualificatif/update/'+qualificatif['idQualificatif']+'/'+qualificatif['minimal']+'/'+qualificatif['maximal']);
  }
}