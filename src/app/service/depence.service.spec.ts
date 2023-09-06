import { TestBed } from '@angular/core/testing';

import { DepenceService } from './depence.service';

describe('DepenceService', () => {
  let service: DepenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
