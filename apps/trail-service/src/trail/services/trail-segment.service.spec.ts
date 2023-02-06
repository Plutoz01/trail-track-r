import { Test, TestingModule } from '@nestjs/testing';
import { TrailSegmentService } from './trail-segment.service';

describe('TrailSegmentService', () => {
  let service: TrailSegmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailSegmentService],
    }).compile();

    service = module.get<TrailSegmentService>(TrailSegmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
