import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrailListComponent } from './trail-list/trail-list.component';

const routes: Routes = [
  {
    path: '',
    component: TrailListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrailsBrowsingRoutingModule {
}
