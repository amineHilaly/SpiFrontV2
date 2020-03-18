import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificatifComponent } from './qualificatif.component';

describe('QualificatifComponent', () => {
  let component: QualificatifComponent;
  let fixture: ComponentFixture<QualificatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
