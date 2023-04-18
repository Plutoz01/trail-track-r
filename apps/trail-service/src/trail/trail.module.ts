import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import entities from './entities';
import { TrailResolver, TrailSegmentGroupResolver, TrailSegmentResolver } from './resolvers';
import { TrailSegmentGroupService, TrailSegmentService, TrailService } from './services';

const services: Provider[] = [
  TrailService,
  TrailSegmentGroupService,
  TrailSegmentService
];

const resolvers: Provider[] = [
  TrailResolver,
  TrailSegmentResolver,
  TrailSegmentGroupResolver
];

@Module({
  imports: [
    TypeOrmModule.forFeature([...entities])
  ],
  providers: [
    ...services,
    ...resolvers
  ]
})
export class TrailModule {
  static entities(): typeof entities {
    return entities;
  }
}
