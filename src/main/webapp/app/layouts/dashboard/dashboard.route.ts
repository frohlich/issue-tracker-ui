import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export const dashboardRoute: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            authorities: [],
            pageTitle: 'Dashboard | IssueTracker'
        }
    }
];
