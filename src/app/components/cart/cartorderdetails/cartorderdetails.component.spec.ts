import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartorderdetailsComponent } from './cartorderdetails.component';

describe('CartorderdetailsComponent', () => {
  let component: CartorderdetailsComponent;
  let fixture: ComponentFixture<CartorderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartorderdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartorderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
