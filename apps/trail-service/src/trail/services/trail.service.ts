import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trail } from '../entities';
import { BaseCrudService } from './base-crud.service';

@Injectable()
export class TrailService extends BaseCrudService<Trail> {
  constructor(
    @InjectRepository(Trail) readonly repository: Repository<Trail>
  ) {
    super(repository);
  }

  async findById(id: string): Promise<Trail | null> {
    return this.repository.findOneBy({ id });
  }
}
