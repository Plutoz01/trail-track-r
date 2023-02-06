import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailController } from './controllers/trail.controller';
import { TrailService } from './services/trail.service';
import entities from './entities';
import { TrailSegmentController } from './controllers/trail-segment.controller';
import { TrailSegmentService } from './services/trail-segment.service';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [
    TrailController,
    TrailSegmentController
  ],
  providers: [
    TrailService,
    TrailSegmentService
  ]
})
export class TrailModule {
  static entities(): typeof entities {
    return entities;
  }
}
