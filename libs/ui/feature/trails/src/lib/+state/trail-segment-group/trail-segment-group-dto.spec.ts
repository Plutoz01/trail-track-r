import { TrailSegmentGroupDto } from '@trail-track-r/api-contract/trail';

export const createTrailSegmentGroupDto = (id: string, trailId = '', name = ''): TrailSegmentGroupDto => ({
  id,
  trailId,
  name: name || `name-${id}`
});
