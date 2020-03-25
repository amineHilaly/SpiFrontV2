import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCComponent } from './list-c.component';

describe('ListCComponent', () => {
  let component: ListCComponent;
  let fixture: ComponentFixture<ListCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
