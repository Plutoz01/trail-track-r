import { TrailSegmentDto } from '@trail-track-r/api-contract/trail';

export const createTrailSegmentDto = (id: string,
                               groupId: string = '',
                               name = '',
                               length = 100,
                               coordinates = []
): TrailSegmentDto => ({
  id,
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates
  },
  properties: {
    name: name || `name-${id}`,
    length,
    groupId
  }
});
