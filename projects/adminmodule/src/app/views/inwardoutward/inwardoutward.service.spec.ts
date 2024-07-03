import { TestBed } from '@angular/core/testing';

import { InwardoutwardService } from './inwardoutward.service';

describe('InwardoutwardService', () => {
  let service: InwardoutwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InwardoutwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
