import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtocartbillComponent } from './addtocartbill.component';

describe('AddtocartbillComponent', () => {
  let component: AddtocartbillComponent;
  let fixture: ComponentFixture<AddtocartbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtocartbillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtocartbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
