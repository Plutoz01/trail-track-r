import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trail } from '../entities';

@Injectable()
export class TrailService {
  constructor(
    @InjectRepository(Trail) private readonly repository: Repository<Trail>
  ) {}

  // TODO: pagination
  async findAll(): Promise<Trail[]> {
    return this.repository.find();
  }
}
