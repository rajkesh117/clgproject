import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewticketdetailspopupComponent } from './viewticketdetailspopup.component';

describe('ViewticketdetailspopupComponent', () => {
  let component: ViewticketdetailspopupComponent;
  let fixture: ComponentFixture<ViewticketdetailspopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewticketdetailspopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewticketdetailspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
