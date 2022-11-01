import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReqComponent } from './customer-req.component';

describe('CustomerReqComponent', () => {
  let component: CustomerReqComponent;
  let fixture: ComponentFixture<CustomerReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
