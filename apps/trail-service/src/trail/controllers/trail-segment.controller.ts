import { Controller, Get } from '@nestjs/common';
import { TrailSegment } from '../entities';
import { TrailSegmentService } from '../services/trail-segment.service';
import {
  TrailSegmentDto,
  TrailSegmentCollectionDto
} from '@trail-track-r/api-contract/trail'

@Controller('trail-segments')
export class TrailSegmentController {
    constructor(private readonly trailSegmentService: TrailSegmentService) {}

    // TODO: Pagination support
    @Get()
    async getTrailSegments(): Promise<TrailSegmentCollectionDto> {
      const segments = await this.trailSegmentService.findAll();
      return TrailSegmentController.toCollectionDto(segments);
    }

    private static toDto(segment: TrailSegment): TrailSegmentDto {
      return {
        type: 'Feature',
        id: segment.id,
        geometry: segment.path,
        properties: {
          name: segment.name,
          groupId: 'TODO' // TODO
        }
      }
    }

    private static toCollectionDto(segments: TrailSegment[]): TrailSegmentCollectionDto {
      return {
        type: 'FeatureCollection',
        features: segments.map(TrailSegmentController.toDto)
      };
    }
}
