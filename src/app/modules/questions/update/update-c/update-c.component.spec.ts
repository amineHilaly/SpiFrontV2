import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCComponent } from './update-c.component';

describe('UpdateCComponent', () => {
  let component: UpdateCComponent;
  let fixture: ComponentFixture<UpdateCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
