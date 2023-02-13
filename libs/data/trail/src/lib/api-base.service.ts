import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export abstract class ApiBaseService {
  // TODO: get from config;
  protected readonly host = 'http://localhost:3333';
  protected readonly apiSegment = 'api';

  constructor(protected readonly http: HttpClient) { }

  protected get apiBasePath(): string {
    return `${this.host}/${this.apiSegment}`;
  }

}
