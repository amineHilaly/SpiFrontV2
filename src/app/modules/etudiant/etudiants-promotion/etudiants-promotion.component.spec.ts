import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantsPromotionComponent } from './etudiants-promotion.component';

describe('EtudiantsPromotionComponent', () => {
  let component: EtudiantsPromotionComponent;
  let fixture: ComponentFixture<EtudiantsPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtudiantsPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantsPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
