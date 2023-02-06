import { Controller, Get } from '@nestjs/common';
import { Trail } from '../entities';
import { TrailService } from '../services/trail.service';

@Controller('trails')
export class TrailController {
  constructor(private readonly trailService: TrailService) {}

  // TODO: Pagination support
  @Get()
  async getTrails(): Promise<Trail[]> {
    return this.trailService.findAll();
  }
}
