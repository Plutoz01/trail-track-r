import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { TrailSegmentGroup } from './trail-segment-group.entity';
import { CommonProperties } from './common-properties';

@ObjectType()
class TrailProperties extends CommonProperties {
}

@Entity({ name: 'trail' })
@ObjectType()
export class Trail extends BaseEntity {
  @Column({
    nullable: false,
    unique: true
  })
  @Field({ nullable: false })
  name: string;

  @OneToMany(() => TrailSegmentGroup, segmentGroup => segmentGroup.trail)
  @Field(() => [TrailSegmentGroup], { nullable: false })
  segmentGroups: TrailSegmentGroup[];

  @Column('jsonb')
  @Field(() => TrailProperties, { nullable: true })
  properties: TrailProperties;
}
