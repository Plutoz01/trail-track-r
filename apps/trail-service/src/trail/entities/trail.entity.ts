import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Trail extends BaseEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    nullable: true
  })
  description?: string;
  
  @Column({
    nullable: true
  })
  externalUrl?: string;
}
