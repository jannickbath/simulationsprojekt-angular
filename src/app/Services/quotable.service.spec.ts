import { TestBed } from '@angular/core/testing';

import { QuotableService } from './quotable.service';

describe('QuotableService', () => {
  let service: QuotableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
