import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { LineString } from 'geojson';
import { TrailSegment } from '../entities';
import { TrailSegmentService } from '../services';
import { BaseCommonPropertiesResolver } from './base-common-properties.resolver';

@Resolver(() => TrailSegment)
export class TrailSegmentResolver extends BaseCommonPropertiesResolver(TrailSegment) {
  constructor(
    private readonly trailSegmentService: TrailSegmentService
  ) {
    super(trailSegmentService);
  }

  @ResolveField(() => [[Float]])
  async path(@Parent() segment: TrailSegment): Promise<LineString['coordinates']> {
    return segment?.path?.coordinates || [];
  }
}
