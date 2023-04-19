import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrailDetailsContainerComponent, TrailListContainerComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: TrailListContainerComponent
  },
  {
    path: 'trail/:trailId',
    component: TrailDetailsContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrailsBrowsingRoutingModule {
}
