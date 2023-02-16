import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'my-progress',
        loadChildren: () => import('./modules/trail-progress/trail-progress.module').then(m => m.TrailProgressModule)
    },
    {
        path: '',
        redirectTo: '/my-progress',
        pathMatch: 'full'
    }
];
