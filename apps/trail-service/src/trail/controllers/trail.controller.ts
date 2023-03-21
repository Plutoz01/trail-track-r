import { Controller, Get } from '@nestjs/common';
import { Trail } from '../entities';
import { TrailDto } from '@trail-track-r/api-contract/trail';
import { TrailService } from '../services/trail.service';

@Controller('trails')
export class TrailController {
  constructor(private readonly trailService: TrailService) {}

  @Get()
  async getTrails(): Promise<TrailDto[]> {
    return (await this.trailService.findAll()).map(TrailController.toDto);
  }

  private static toDto(trail: Trail): TrailDto {
    return {
      id: trail.id,
      name: trail.name,
      orgId: 'TODO: need to implement', // TODO
      length: 0, // TODO
      description: 'TODO',
      externalUrl: 'TODO'
    }
  }
}
