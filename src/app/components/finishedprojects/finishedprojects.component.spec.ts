import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedprojectsComponent } from './finishedprojects.component';

describe('FinishedprojectsComponent', () => {
  let component: FinishedprojectsComponent;
  let fixture: ComponentFixture<FinishedprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedprojectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
