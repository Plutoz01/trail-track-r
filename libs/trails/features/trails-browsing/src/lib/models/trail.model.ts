import { TrailSegmentGroup } from './trail-segment-group.model';

export interface Trail {
  id: string;
  name?: string;
  url?: string;
  length?: number;
  segmentGroups?: TrailSegmentGroup[];
}
