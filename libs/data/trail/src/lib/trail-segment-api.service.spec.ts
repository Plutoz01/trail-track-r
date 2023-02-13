import { TestBed } from '@angular/core/testing';

import { TrailSegmentApiService } from './trail-segment-api.service';

describe('TrailSegmentApiService', () => {
  let service: TrailSegmentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailSegmentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
