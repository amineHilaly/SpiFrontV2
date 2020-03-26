import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueUpdateComponent } from './rubrique-update.component';

describe('RubriqueUpdateComponent', () => {
  let component: RubriqueUpdateComponent;
  let fixture: ComponentFixture<RubriqueUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
