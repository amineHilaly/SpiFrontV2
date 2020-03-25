import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationAddComponent } from './evaluation-add.component';

describe('EvaluationAddComponent', () => {
  let component: EvaluationAddComponent;
  let fixture: ComponentFixture<EvaluationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
