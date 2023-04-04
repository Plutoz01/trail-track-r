import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'browse-trails',
    loadChildren: () => import('@trail-track-r/trails/features/trails-browsing').then(m => m.TrailsBrowsingModule)
  },
  {
    path: '',
    redirectTo: '/browse-trails',
    pathMatch: 'full'
  }
];
