import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Trail } from '../../../models/trail.model';

const GET_TRAIL = gql`
  query GetTrail($id: ID!) {
    findTrailById(id: $id) {
      id
      name
      length
      segmentGroups {
        id
        name
        length
        segments {
          id
          name
          length
        }
      }
    }
  }
`;

@Component({
  selector: 'ttr-trail-details-container',
  templateUrl: './trail-details-container.component.html',
  styleUrls: ['./trail-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrailDetailsContainerComponent {
  private readonly trailId$ = this.route.params.pipe(
    map(params => params['trailId']),
    filter(Boolean),
    distinctUntilChanged()
  );
  private readonly trailQuery$ = this.trailId$.pipe(
    switchMap(id => this.apollo
      .watchQuery<{ findTrailById?: Trail }>({ query: GET_TRAIL, variables: { id } })
      .valueChanges
    )
  );
  readonly trail$ = this.trailQuery$.pipe(
    map(response => response.data.findTrailById)
  );

  constructor(private readonly apollo: Apollo,
              private readonly route: ActivatedRoute) {
  }
}
