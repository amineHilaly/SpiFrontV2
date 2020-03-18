import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificatifUpdateComponent } from './qualificatif-update.component';

describe('QualificatifUpdateComponent', () => {
  let component: QualificatifUpdateComponent;
  let fixture: ComponentFixture<QualificatifUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificatifUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificatifUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});