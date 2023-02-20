import { Injectable } from '@angular/core';
import { TrailSegmentCollectionDto, TrailSegmentDto } from '@trail-track-r/api-contract/trail';
import { map, Observable } from 'rxjs';
import { HttpApiBaseService } from './http-api-base.service';

@Injectable({
  providedIn: 'root',
})
export class TrailSegmentApiService extends HttpApiBaseService {
  private readonly apiPath = `${this.apiBasePath}/trail-segments`;

  getAll$(): Observable<TrailSegmentDto[]> {
    return this.http.get<TrailSegmentCollectionDto>(this.apiPath).pipe(
      map(collectionDto => collectionDto.features)
    );
  }
}
