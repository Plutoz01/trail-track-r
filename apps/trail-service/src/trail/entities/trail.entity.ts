import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'trail' })
@ObjectType()
export class Trail extends BaseEntity {
  @Column({
    nullable: false,
    unique: true
  })
  @Field({nullable: false})
  name: string;

  @Column()
  @Field({nullable: true})
  description?: string;

  @Column()
  @Field({nullable: true})
  length?: number;
}
