import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerDetailsTenantsDialogComponent } from './customer-details-tenants-dialog.component';

describe('CustomerDetailsTenantsDialogComponent', () => {
  let component: CustomerDetailsTenantsDialogComponent;
  let fixture: ComponentFixture<CustomerDetailsTenantsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailsTenantsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsTenantsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
