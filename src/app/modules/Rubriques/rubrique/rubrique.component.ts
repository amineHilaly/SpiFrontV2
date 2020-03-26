import { Component, OnInit } from '@angular/core';
import { RubriqueService } from 'src/app/service/rubrique.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationRubriqueComponent } from '../../extra/confirmation-rubrique/confirmation-rubrique.component';


@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.scss']
})
export class RubriqueComponent implements OnInit {


  rubriques:any = [];
  page;
  pageNumber = 1;
  pagesRange = [];
  numberOfPages;
  numberOfElements = 4;
  pageable;

  constructor(public rubriqueservice:RubriqueService,private dialog: MatDialog,
     private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.getRubriques();
  }

  getRubriques() {

    this.rubriques = [];
   
    this.rubriqueservice.getAll().subscribe((data: {}) => {
      this.rubriques = data;
      this.numberOfPages = Math.floor(this.rubriques.length/this.numberOfElements);
        if((this.rubriques.length % this.numberOfElements) != 0){
          this.numberOfPages++;
        }
        this.pagesRange=[];

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
    this.page = this.rubriques.slice((this.pageNumber - 1) * this.numberOfElements, this.pageNumber  * this.numberOfElements);
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
    this.dialog.open(ConfirmationRubriqueComponent,{
      data: {
        entity : "Rubrique",
        id : id,
        service : this.rubriqueservice,
        father : this
      }
    });
  }
 
  update(rubrique) : void {
    this.router.navigateByUrl('/Rubriques/Update/'+rubrique['idRubrique']+'/'+rubrique['designation']+'/'+rubrique['ordre']+'/'+rubrique['type']);
  }

}
