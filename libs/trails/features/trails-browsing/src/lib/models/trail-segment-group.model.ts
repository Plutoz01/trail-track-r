import { TrailSegment } from './trail-segment.model';

export interface TrailSegmentGroup {
  id: string;
  name?: string;
  url?: string;
  length?: number;
  segments?: TrailSegment[];
}
