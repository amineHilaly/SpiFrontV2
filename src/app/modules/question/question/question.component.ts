import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  private questions:any;
  constructor(private questionservice:QuestionService, private router:ActivatedRoute) { }

  ngOnInit() {
    this.getAllQuestion();
  }

  private getAllQuestion() {
    this.questionservice.getAllQuestion()
      .subscribe((data) => {
        this.questions = data;
        console.log(this.questions);
      }, err => {
      });
  }

}
