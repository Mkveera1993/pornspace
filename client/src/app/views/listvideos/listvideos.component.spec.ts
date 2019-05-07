import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvideosComponent } from './listvideos.component';

describe('ListvideosComponent', () => {
  let component: ListvideosComponent;
  let fixture: ComponentFixture<ListvideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListvideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
