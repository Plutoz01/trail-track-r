import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailService } from './services/trail.service';
import entities from './entities';
import { TrailSegmentService } from './services/trail-segment.service';
import { TrailResolver } from './resolvers/trail.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  providers: [
    TrailService,
    TrailSegmentService,
    TrailResolver
  ]
})
export class TrailModule {
  static entities(): typeof entities {
    return entities;
  }
}
