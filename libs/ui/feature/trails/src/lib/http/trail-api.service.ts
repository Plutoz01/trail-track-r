import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TrailDto } from '@trail-track-r/api-contract/trail';
import { dummyTrails } from '../data/trail-dto.data';
import { HttpApiBaseService } from './http-api-base.service';

@Injectable()
export class TrailApiService extends HttpApiBaseService {
  private readonly apiPath = `${this.apiBasePath}/trails`;

  getAll$(): Observable<TrailDto[]> {
    // TODO: use API response instead of dummy data
    // return this.http.get<TrailDto[]>(this.apiPath);
    return of(dummyTrails);
  }
}
