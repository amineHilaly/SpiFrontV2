import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificatifAddComponent } from './qualificatif-add.component';

describe('QualificatifAddComponent', () => {
  let component: QualificatifAddComponent;
  let fixture: ComponentFixture<QualificatifAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificatifAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificatifAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
