import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonProperties } from './common-properties';
import { CommonPropertiesContainer } from './common-properties-container';
import { TrailSegment } from './trail-segment.entity';
import { Trail } from './trail.entity';

class TrailSegmentGroupProperties extends CommonProperties {
}

@Entity({ name: 'trail_segment_group' })
@ObjectType()
export class TrailSegmentGroup extends CommonPropertiesContainer<TrailSegmentGroupProperties> {
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
  properties: TrailSegmentGroupProperties;
}
