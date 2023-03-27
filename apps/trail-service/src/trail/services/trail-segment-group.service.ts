import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrailSegmentGroup } from '../entities';
import { Repository } from 'typeorm';
import { BaseCrudService } from './base-crud.service';

@Injectable()
export class TrailSegmentGroupService extends BaseCrudService<TrailSegmentGroup> {
  constructor(
    @InjectRepository(TrailSegmentGroup) readonly repository: Repository<TrailSegmentGroup>
  ) {
    super(repository);
  }

  async findByTrailId(trailId: string): Promise<TrailSegmentGroup[] | null> {
    return this.repository.findBy({
      trail: {
        id: trailId
      }
    });
  }
}
