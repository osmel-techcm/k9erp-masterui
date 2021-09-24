import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerDetailsTenantsComponent } from './customer-details-tenants.component';

describe('CustomerDetailsTenantsComponent', () => {
  let component: CustomerDetailsTenantsComponent;
  let fixture: ComponentFixture<CustomerDetailsTenantsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailsTenantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
