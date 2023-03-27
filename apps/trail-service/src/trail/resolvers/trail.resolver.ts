import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Trail, TrailSegmentGroup } from '../entities';
import { TrailSegmentGroupService, TrailService } from '../services';

@Resolver(() => Trail)
export class TrailResolver {
  constructor(
    private readonly trailService: TrailService,
    private readonly trailSegmentGroupService: TrailSegmentGroupService,
  ) {
  }

  @Query(() => [Trail])
  async trails(): Promise<Trail[]> {
    return this.trailService.findAll();
  }

  @Query(() => Trail, { nullable: true })
  async trail(@Args('id', { type: () => ID }) id: string): Promise<Trail | null> {
    return this.trailService.findById(id);
  }

  @ResolveField()
  async segmentGroups(@Parent() trail: Trail): Promise<TrailSegmentGroup[]> {
    return await this.trailSegmentGroupService.findByTrailId(trail.id) || [];
  }
}
