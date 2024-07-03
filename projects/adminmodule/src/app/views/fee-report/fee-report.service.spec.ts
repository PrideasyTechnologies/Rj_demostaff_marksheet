import { TestBed } from '@angular/core/testing';

import { FeeReportService } from './fee-report.service';

describe('FeeReportService', () => {
  let service: FeeReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
