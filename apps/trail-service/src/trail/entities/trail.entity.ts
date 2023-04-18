import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonProperties } from './common-properties';
import { CommonPropertiesContainer } from './common-properties-container';
import { TrailSegmentGroup } from './trail-segment-group.entity';

class TrailProperties extends CommonProperties {
}

@Entity({ name: 'trail' })
@ObjectType()
export class Trail extends CommonPropertiesContainer<TrailProperties> {
  @Column({
    nullable: false,
    unique: true
  })
  @Field({ nullable: false })
  name: string;

  @OneToMany(() => TrailSegmentGroup, segmentGroup => segmentGroup.trail)
  @Field(() => [TrailSegmentGroup], { nullable: false })
  segmentGroups: Promise<TrailSegmentGroup[]>;

  @Column('jsonb')
  properties: TrailProperties;
}
