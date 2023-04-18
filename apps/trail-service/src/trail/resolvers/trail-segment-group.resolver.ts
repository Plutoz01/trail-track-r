import { TrailSegmentGroup } from '../entities';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { TrailSegmentGroupService } from '../services';

@Resolver(() => TrailSegmentGroup)
export class TrailSegmentGroupResolver {
  constructor(
    private readonly trailSegmentGroupService: TrailSegmentGroupService
  ) {
  }

  @Query(() => TrailSegmentGroup, { nullable: true })
  async trailSegment(@Args('id', { type: () => ID }) id: string): Promise<TrailSegmentGroup | null> {
    return this.trailSegmentGroupService.findById(id);
  }
}
