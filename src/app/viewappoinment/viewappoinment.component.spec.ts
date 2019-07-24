import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewappoinmentComponent } from './viewappoinment.component';

describe('ViewappoinmentComponent', () => {
  let component: ViewappoinmentComponent;
  let fixture: ComponentFixture<ViewappoinmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewappoinmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewappoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
