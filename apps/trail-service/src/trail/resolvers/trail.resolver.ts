import { Resolver } from '@nestjs/graphql';
import { Trail } from '../entities';
import { TrailService } from '../services';
import { BaseCommonPropertiesResolver } from './base-common-properties.resolver';

@Resolver(() => Trail)
export class TrailResolver extends BaseCommonPropertiesResolver(Trail) {
  constructor(
    private readonly trailService: TrailService
  ) {
    super(trailService)
  }
}
