import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { ActivatedRoute , Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../../../extra/confirmQuestion/confirm/confirm.component';
import { UpdateCComponent } from '../../update/update-c/update-c.component';

@Component({
  selector: 'app-list-c',
  templateUrl: './list-c.component.html',
  styleUrls: ['./list-c.component.scss']
})



export class ListCComponent implements OnInit {


  page;
  pageNumber = 1;
  pagesRange = [];
  numberOfPages;
  numberOfElements = 4;
  pageable;
  questions:any;
  constructor(private questionservice:QuestionService, private dialog: MatDialog,private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.getAllQuestion();
  }

   getAllQuestion() {
    this.questionservice.getAllQuestion()
      .subscribe((data) => {
        this.questions = data;
        this.numberOfPages = Math.floor(this.questions.length/this.numberOfElements);
        if((this.questions.length % this.numberOfElements) != 0){
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
        console.log(this.questions);
      }, err => {
      });


  }

  private getPage() {
    this.page = this.questions.slice((this.pageNumber - 1) * this.numberOfElements, this.pageNumber  * this.numberOfElements);
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
    this.dialog.open(ConfirmComponent,{
      data: {
        entity : "Question",
        id: id,
        service : this.questionservice,
        father : this
      }
    });
  }
  update(question) : void {
    this.questionservice.detail(question).subscribe((data) => {
      console.log("dkhelt ldétail");
      question = data[0];
      console.log(question);
      

           UpdateCComponent.question = question;
      
            this.router.navigate(['Questions/update']);
    
      
      })
    
  }
}

