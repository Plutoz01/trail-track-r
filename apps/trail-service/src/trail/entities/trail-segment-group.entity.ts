import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { Trail } from './trail.entity';
import { TrailSegment } from './trail-segment.entity';
import { CommonProperties } from './common-properties';

@ObjectType()
class TrailSegmentGroupProperties extends CommonProperties {
}

@Entity({ name: 'trail_segment_group' })
@ObjectType()
export class TrailSegmentGroup extends BaseEntity {
  @Column({
    nullable: false,
    unique: true
  })
  @Field({ nullable: false })
  name: string;

  @ManyToOne(
    () => Trail,
    trail => trail.segmentGroups, {
      cascade: true,
      orphanedRowAction: 'delete'
    }
  )
  @JoinColumn({ name: 'trail_id' })
  @Field(() => Trail, { nullable: false })
  trail: Trail;

  @OneToMany(() => TrailSegment, segment => segment.segmentGroup)
  @Field(() => [TrailSegment], { nullable: false })
  segments: Promise<TrailSegment[]>;

  @Column('jsonb')
  @Field(() => TrailSegmentGroupProperties, { nullable: true })
  properties: TrailSegmentGroupProperties;
}
