import { Injectable } from '@angular/core';
import { TrailDto as TrailDto } from '@trail-track-r/api-contract/trail';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';

@Injectable({
  providedIn: 'root'
})
export class TrailApiService extends ApiBaseService {
  private readonly apiPath = `${this.apiBasePath}/trails`;

  getAll$(): Observable<TrailDto[]> {
    return this.http.get<TrailDto[]>(this.apiPath);
  }
}
