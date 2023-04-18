import { Resolver } from '@nestjs/graphql';
import { TrailSegmentGroup } from '../entities';
import { TrailSegmentGroupService } from '../services';
import { BaseCommonPropertiesResolver } from './base-common-properties.resolver';

@Resolver(() => TrailSegmentGroup)
export class TrailSegmentGroupResolver extends BaseCommonPropertiesResolver(TrailSegmentGroup) {
  constructor(
    private readonly trailSegmentGroupService: TrailSegmentGroupService
  ) {
    super(trailSegmentGroupService)
  }
}
