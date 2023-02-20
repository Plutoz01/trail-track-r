import { TestBed } from '@angular/core/testing';

import { TrailApiService } from './trail-api.service';

describe('TrailApiService', () => {
  let service: TrailApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
