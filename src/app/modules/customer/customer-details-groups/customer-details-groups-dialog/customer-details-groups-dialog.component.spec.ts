import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsGroupsDialogComponent } from './customer-details-groups-dialog.component';

describe('CustomerDetailsGroupsDialogComponent', () => {
  let component: CustomerDetailsGroupsDialogComponent;
  let fixture: ComponentFixture<CustomerDetailsGroupsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsGroupsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsGroupsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
