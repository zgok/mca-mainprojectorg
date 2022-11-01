import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedCustomersComponent } from './ordered-customers.component';

describe('OrderedCustomersComponent', () => {
  let component: OrderedCustomersComponent;
  let fixture: ComponentFixture<OrderedCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
