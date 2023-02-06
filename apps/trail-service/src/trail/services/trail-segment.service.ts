import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrailSegment } from '../entities';

@Injectable()
export class TrailSegmentService {
  constructor(
    @InjectRepository(TrailSegment) private readonly repository: Repository<TrailSegment>
  ) {}

    // TODO: pagination
    async findAll(): Promise<TrailSegment[]> {
        return this.repository.find();
      }
}
