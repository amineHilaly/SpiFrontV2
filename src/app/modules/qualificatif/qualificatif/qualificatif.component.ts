import { Component, OnInit, NgModule } from '@angular/core';
import { QualificatifService } from '../../../service/qualificatif.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from '../../extra/confirmation/confirmation.component';




@Component({
  selector: 'app-qualificatif',
  templateUrl: './qualificatif.component.html',
  styleUrls: ['./qualificatif.component.scss']
})



export class QualificatifComponent implements OnInit {


  qualificatifs:any = [];
  page;
  pageNumber = 1;
  pagesRange = [];
  numberOfPages;
  numberOfElements = 4;
  pageable;

  constructor(public qualificatifService:QualificatifService,private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getQualificatifs();
  }

  getQualificatifs() {
    this.qualificatifs = [];
    this.qualificatifService.getAll().subscribe((data: {}) => {
      this.qualificatifs = data;
      this.numberOfPages = Math.floor(this.qualificatifs.length/this.numberOfElements);
        if((this.qualificatifs.length % this.numberOfElements) != 0){
          this.numberOfPages++;
        }
        for(let i = 1  ; i < this.numberOfPages ; i++  ){
          this.pagesRange.push(i+1);
        }
        if(this.numberOfPages == 1){
          this.pageable= false;
        }else{
          this.pageable= true;
        }
        this.getPage();
    });
  }

  private getPage() {
    this.page = this.qualificatifs.slice((this.pageNumber - 1) * this.numberOfElements, this.pageNumber  * this.numberOfElements);
  }

  change(i){
    this.pageNumber = i;
    this.getPage();
    this.setSelected();
  }

  previous(){
    if(this.pageNumber > 1){
      this.pageNumber--;
      this.getPage()
      this.setSelected();
    }
  }

  next(){
    if(this.pageNumber < this.numberOfPages){
      this.pageNumber++;
      this.getPage()
      this.setSelected();
    }
  }

  setSelected(){
    (document.querySelector('#li'+this.pageNumber) as HTMLLIElement).classList.add("active");
    let allPages = this.pagesRange.concat([1]);
    console.log(allPages);
    console.log(this.pagesRange);
    for(let i of allPages){
      if(i != this.pageNumber){
        (document.querySelector('#li'+i) as HTMLLIElement).classList.remove("active");
      }
    }
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