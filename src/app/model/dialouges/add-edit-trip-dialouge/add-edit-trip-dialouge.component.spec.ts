import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTripDialougeComponent } from './add-edit-trip-dialouge.component';

describe('AddEditTripDialougeComponent', () => {
  let component: AddEditTripDialougeComponent;
  let fixture: ComponentFixture<AddEditTripDialougeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTripDialougeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTripDialougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
