import { TestBed } from '@angular/core/testing';

import { BrabdsService } from './brabds.service';

describe('BrabdsService', () => {
  let service: BrabdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrabdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
