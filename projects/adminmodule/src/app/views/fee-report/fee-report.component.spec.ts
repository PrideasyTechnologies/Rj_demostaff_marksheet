import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeReportComponent } from './fee-report.component';

describe('FeeReportComponent', () => {
  let component: FeeReportComponent;
  let fixture: ComponentFixture<FeeReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeReportComponent]
    });
    fixture = TestBed.createComponent(FeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
