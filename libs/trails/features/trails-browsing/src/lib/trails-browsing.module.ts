import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TrailListComponent, TrailListContainerComponent, TrailListItemComponent } from './components';
import { TrailsBrowsingRoutingModule } from './trails-browsing-routing.module';

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
      useFactory (httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3333/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  declarations: [
    TrailListContainerComponent,
    TrailListItemComponent,
    TrailListComponent,
  ],
  exports: [
    TrailListContainerComponent
  ]
})
export class TrailsBrowsingModule {
}
