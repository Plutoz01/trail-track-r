import { TrailDto } from '@trail-track-r/api-contract/trail';

export const createTrailDto = (id: string, name = '', orgId: string = '', length: number = 100): TrailDto => ({
  id,
  name: name || `name-${id}`,
  orgId,
  length
});
