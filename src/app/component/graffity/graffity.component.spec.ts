import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraffityComponent } from './graffity.component';

describe('GraffityComponent', () => {
  let component: GraffityComponent;
  let fixture: ComponentFixture<GraffityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraffityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraffityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
