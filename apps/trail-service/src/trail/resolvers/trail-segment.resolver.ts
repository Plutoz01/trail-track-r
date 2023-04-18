import { Args, Float, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TrailSegment } from '../entities';
import { TrailSegmentService } from '../services';

@Resolver(() => TrailSegment)
export class TrailSegmentResolver {
  constructor(
    private readonly trailSegmentService: TrailSegmentService
  ) {
  }

  @ResolveField(() => [[Float]])
  async path(@Parent() segment: TrailSegment): Promise<number[][]> {
    return segment?.path?.coordinates || [];
  }

  @Query(() => TrailSegment, { nullable: true })
  async trailSegment(@Args('id', { type: () => ID }) id: string): Promise<TrailSegment | null> {
    return this.trailSegmentService.findById(id);
  }
}
