import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { TrailService } from '../services/trail.service';
import { Trail } from '../entities';

@Resolver(() => Trail)
export class TrailResolver {
  constructor(private readonly trailService: TrailService) {
  }

  @Query(() => [Trail])
  async trails(): Promise<Trail[]> {
    return this.trailService.findAll();
  }

  @Query(() => Trail, { nullable: true })
  async trail(@Args('id', { type: () => ID }) id: string): Promise<Trail | null> {
    return this.trailService.findById(id);
  }
}
