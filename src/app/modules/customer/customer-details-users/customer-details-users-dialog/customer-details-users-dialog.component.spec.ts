import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsUsersDialogComponent } from './customer-details-users-dialog.component';

describe('CustomerDetailsUsersDialogComponent', () => {
  let component: CustomerDetailsUsersDialogComponent;
  let fixture: ComponentFixture<CustomerDetailsUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsUsersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
