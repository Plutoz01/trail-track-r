import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {
  TrailDetailsComponent,
  TrailDetailsContainerComponent,
  TrailListComponent,
  TrailListContainerComponent,
  TrailListItemComponent
} from './components';
import { TrailsBrowsingRoutingModule } from './trails-browsing-routing.module';

function provideApollo(httpLink: HttpLink) {
  const authToken = 'dummy-user';
  const uri = 'http://localhost:3333/graphql';
  const auth = setContext((_operation, _context) => ({
    headers: {
      Authorization: authToken
    }
  }));

  const link = ApolloLink.from([auth, httpLink.create({ uri })]);
  return {
    link,
    cache: new InMemoryCache()
  };
}

@NgModule({
  imports: [
    CommonModule,
    ApolloModule,
    DividerModule,
    ProgressSpinnerModule,
    TrailsBrowsingRoutingModule
  ],
  providers: [
    // TODO: consider providing this in the consumer parent module
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink]
    }
  ],
  declarations: [
    TrailListContainerComponent,
    TrailListItemComponent,
    TrailListComponent,
    TrailDetailsComponent,
    TrailDetailsContainerComponent
  ],
  exports: [TrailListContainerComponent]
})
export class TrailsBrowsingModule {
}
