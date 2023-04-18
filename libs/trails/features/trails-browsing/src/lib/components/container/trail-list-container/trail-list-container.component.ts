import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Trail } from '../../../models/trail.model';

const GET_ALL_TRAILS = gql`
  query trails {
    findAllTrail {
      id
      name
      url
      length
    }
  }
`;


@Component({
  selector: 'ttr-trail-list-container',
  templateUrl: './trail-list-container.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrailListContainerComponent {
  private readonly trailsQuery$ = this.apollo.watchQuery<{ findAllTrail: Trail[] }>({query: GET_ALL_TRAILS}).valueChanges;
  readonly trails$ = this.trailsQuery$.pipe(
    map(response => response.data.findAllTrail)
  );
  readonly isLoading$ = this.trailsQuery$.pipe(map(response => response.loading));

  constructor (private readonly apollo: Apollo) {
  }
}
