import { TestBed } from '@angular/core/testing';

import { HrmsService } from './hrms.service';

describe('QuestionpaperuploadService', () => {
  let service: HrmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
