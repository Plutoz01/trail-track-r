import { Controller, Get } from '@nestjs/common';
import { Feature, FeatureCollection, LineString } from 'geojson';
import { TrailSegment } from '../entities';
import { TrailSegmentService } from '../services/trail-segment.service';

@Controller('trail-segments')
export class TrailSegmentController {
    constructor(private readonly trailSegmentService: TrailSegmentService) {}

    // TODO: Pagination support
    @Get()
    async getTrailSegments(): Promise<FeatureCollection<LineString>> {
      const segments = await this.trailSegmentService.findAll();
      return TrailSegmentController.toGeoJsonFeatureCollection(segments);
    }

    private static toGeoJsonFeature(segment: TrailSegment): Feature<LineString> {
      return {
        type: 'Feature',
        id: segment.id,
        geometry: segment.path,
        properties: {
          name: segment.name
        }
      }
    }

    private static toGeoJsonFeatureCollection(segments: TrailSegment[]): FeatureCollection<LineString> {
      return {
        type: 'FeatureCollection',
        features: segments.map(TrailSegmentController.toGeoJsonFeature)
      };
    }
}
