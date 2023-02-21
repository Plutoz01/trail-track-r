import { Feature, FeatureCollection, LineString } from 'geojson';

interface TrailSegmentProperties {
  name: string;
  groupId: string;
  length: number;
  description?: string;
  externalUrl?: string;
}

// TODO: consider to extract geometry related stuff to a dedicated entity
export type TrailSegmentDto = Feature<LineString, TrailSegmentProperties>;

export type TrailSegmentCollectionDto = FeatureCollection<LineString, TrailSegmentProperties>;
