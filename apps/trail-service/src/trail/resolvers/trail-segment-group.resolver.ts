import { TrailSegment, TrailSegmentGroup } from '../entities';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TrailSegmentService } from '../services';

@Resolver(() => TrailSegmentGroup)
export class TrailSegmentGroupResolver {
  constructor(
    private readonly trailSegmentService: TrailSegmentService
  ) {
  }

  @ResolveField()
  async segments(@Parent() segmentGroup: TrailSegmentGroup): Promise<TrailSegment[]> {
    return await this.trailSegmentService.findByTrailSegmentGroupId(segmentGroup.id) || [];
  }
}
