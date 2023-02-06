import { Test, TestingModule } from '@nestjs/testing';
import { TrailSegmentController } from './trail-segment.controller';

describe('TrailSegmentController', () => {
  let controller: TrailSegmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrailSegmentController],
    }).compile();

    controller = module.get<TrailSegmentController>(TrailSegmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
