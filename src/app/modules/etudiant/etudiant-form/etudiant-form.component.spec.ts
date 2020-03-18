import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantFormComponent } from './etudiant-form.component';

describe('EtudiantFormComponent', () => {
  let component: EtudiantFormComponent;
  let fixture: ComponentFixture<EtudiantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtudiantFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
