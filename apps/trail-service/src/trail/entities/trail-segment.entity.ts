import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LineString } from 'geojson';
import { BaseEntity } from './base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { TrailSegmentGroup } from './trail-segment-group.entity';
import { CommonProperties } from './common-properties';

@ObjectType()
class TrailSegmentProperties extends CommonProperties {
}

@Entity({ name: 'trail_segment' })
@ObjectType()
export class TrailSegment extends BaseEntity {
  @Column({
    nullable: false,
    unique: true
  })
  @Field({ nullable: false })
  name: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'LineString',
    srid: 4326,
    nullable: true
  })
  path: LineString;

  @ManyToOne(
    () => TrailSegmentGroup,
    segmentGroup => segmentGroup.segments,
    {
      cascade: true,
      orphanedRowAction: 'delete'
    }
  )
  @JoinColumn({ name: 'trail_segment_group_id' })
  @Field(() => TrailSegmentGroup, { nullable: false })
  segmentGroup: TrailSegmentGroup;

  @Column('jsonb')
  @Field(() => TrailSegmentProperties, { nullable: true })
  properties: TrailSegmentProperties;
}
