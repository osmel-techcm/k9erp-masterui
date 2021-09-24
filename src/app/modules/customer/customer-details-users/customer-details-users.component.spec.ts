import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsUsersComponent } from './customer-details-users.component';

describe('CustomerDetailsUsersComponent', () => {
  let component: CustomerDetailsUsersComponent;
  let fixture: ComponentFixture<CustomerDetailsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
