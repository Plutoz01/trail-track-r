import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProgressComponent } from './pages/my-progress/my-progress.component';

const routes: Routes = [
  {
    path: '',
    component: MyProgressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrailProgressRoutingModule { }
