import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { TrailResolver, TrailSegmentGroupResolver } from './resolvers';
import { TrailSegmentGroupService, TrailSegmentService, TrailService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([...entities])
  ],
  providers: [
    TrailService,
    TrailSegmentGroupService,
    TrailSegmentService,
    TrailResolver,
    TrailSegmentGroupResolver
  ]
})
export class TrailModule {
  static entities(): typeof entities {
    return entities;
  }
}
