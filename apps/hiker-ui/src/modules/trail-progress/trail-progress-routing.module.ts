import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProgressComponent } from './user-progress/user-progress.component';

const routes: Routes = [
  {
    path: '',
    component: UserProgressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrailProgressRoutingModule { }
