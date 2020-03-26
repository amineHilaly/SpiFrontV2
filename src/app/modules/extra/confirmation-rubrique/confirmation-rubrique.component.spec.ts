import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationRubriqueComponent } from './confirmation-rubrique.component';

describe('ConfirmationRubriqueComponent', () => {
  let component: ConfirmationRubriqueComponent;
  let fixture: ComponentFixture<ConfirmationRubriqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationRubriqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationRubriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
