import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsGroupsComponent } from './customer-details-groups.component';

describe('CustomerDetailsGroupsComponent', () => {
  let component: CustomerDetailsGroupsComponent;
  let fixture: ComponentFixture<CustomerDetailsGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
