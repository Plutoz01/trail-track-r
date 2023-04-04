import { ChangeDetectionStrategy, Component, TrackByFunction, ViewEncapsulation } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

const GET_ALL_TRAILS = gql`
  query trails {
    trails {
      id
      name
      properties {
        url
      }
    }
  }
`;

interface Trail {
  id: string;
  name: string;
  properties: {
    url?: string;
  }
}

@Component({
  selector: 'ttr-trail-list',
  templateUrl: './trail-list.component.html',
  styleUrls: ['./trail-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrailListComponent {
  private readonly trailsQuery$ = this.apollo.watchQuery<{ trails: Trail[] }>({ query: GET_ALL_TRAILS }).valueChanges;
  readonly trails$ = this.trailsQuery$.pipe(
    map(response => response.data.trails)
  );
  readonly isLoading$ = this.trailsQuery$.pipe(map(response => response.loading));
  readonly trailTrackByFn: TrackByFunction<Trail> = (_, trail) => trail.id;

  constructor(private readonly apollo: Apollo) {
  }
}
