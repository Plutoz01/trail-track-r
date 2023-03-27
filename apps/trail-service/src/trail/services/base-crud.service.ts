import { BaseEntity } from '../entities/base.entity';
import { Repository } from 'typeorm';


export abstract class BaseCrudService<T extends BaseEntity> {
  protected constructor(protected readonly repository: Repository<T>) {
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: T['id']): Promise<T | null> {
    return this.repository.findOneBy({ id } as never); // TODO: remove this strange casting
  }
}
