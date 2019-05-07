import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayvideoComponent } from './playvideo.component';

describe('PlayvideoComponent', () => {
  let component: PlayvideoComponent;
  let fixture: ComponentFixture<PlayvideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayvideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
