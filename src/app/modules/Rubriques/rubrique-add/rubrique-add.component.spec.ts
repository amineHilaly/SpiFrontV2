import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueAddComponent } from './rubrique-add.component';

describe('RubriqueAddComponent', () => {
  let component: RubriqueAddComponent;
  let fixture: ComponentFixture<RubriqueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
