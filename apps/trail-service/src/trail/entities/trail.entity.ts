import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { TrailSegmentGroup } from './trail-segment-group.entity';

@Entity({ name: 'trail' })
@ObjectType()
export class Trail extends BaseEntity {
  @Column({
    nullable: false,
    unique: true
  })
  @Field({ nullable: false })
  name: string;
  //
  // @Column()
  // @Field({nullable: true})
  // description?: string;
  //
  // @Column()
  // @Field({nullable: true})
  // length?: number;

  @OneToMany(() => TrailSegmentGroup, segmentGroup => segmentGroup.trail)
  @Field(() => [TrailSegmentGroup], { nullable: false })
  segmentGroups: TrailSegmentGroup[];
}
