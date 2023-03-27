import { Test, TestingModule } from '@nestjs/testing';
import { TrailSegmentGroupService } from './trail-segment-group.service';

describe('TrailSegmentGroupService', () => {
  let service: TrailSegmentGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailSegmentGroupService],
    }).compile();

    service = module.get<TrailSegmentGroupService>(TrailSegmentGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
