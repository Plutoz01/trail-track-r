import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { TrailListComponent } from './trail-list/trail-list.component';
import { DividerModule } from 'primeng/divider';
import { TrailsBrowsingRoutingModule } from './trails-browsing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ApolloModule,
    DividerModule,
    TrailsBrowsingRoutingModule
  ],
  providers: [
    // TODO: consider providing this in the consumer parent module
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3333/graphql'
          })
        };
      },
      deps: [HttpLink]
    }
  ],
  declarations: [TrailListComponent],
  exports: [TrailListComponent]
})
export class TrailsBrowsingModule {
}
