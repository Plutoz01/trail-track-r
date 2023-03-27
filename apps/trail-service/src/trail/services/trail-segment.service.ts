import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrailSegment } from '../entities';
import { BaseCrudService } from './base-crud.service';

@Injectable()
export class TrailSegmentService extends BaseCrudService<TrailSegment> {
  constructor(
    @InjectRepository(TrailSegment) readonly repository: Repository<TrailSegment>
  ) {
    super(repository);
  }

  async findByTrailSegmentGroupId(segmentGroupId: string): Promise<TrailSegment[] | null> {
    return this.repository.findBy({
      segmentGroup: {
        id: segmentGroupId
      }
    });
  }
}
