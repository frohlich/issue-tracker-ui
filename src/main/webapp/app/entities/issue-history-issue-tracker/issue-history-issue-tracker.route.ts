import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IssueHistoryIssueTracker } from 'app/shared/model/issue-history-issue-tracker.model';
import { IssueHistoryIssueTrackerService } from './issue-history-issue-tracker.service';
import { IssueHistoryIssueTrackerComponent } from './issue-history-issue-tracker.component';
import { IssueHistoryIssueTrackerDetailComponent } from './issue-history-issue-tracker-detail.component';
import { IssueHistoryIssueTrackerUpdateComponent } from './issue-history-issue-tracker-update.component';
import { IssueHistoryIssueTrackerDeletePopupComponent } from './issue-history-issue-tracker-delete-dialog.component';
import { IIssueHistoryIssueTracker } from 'app/shared/model/issue-history-issue-tracker.model';

@Injectable({ providedIn: 'root' })
export class IssueHistoryIssueTrackerResolve implements Resolve<IIssueHistoryIssueTracker> {
    constructor(private service: IssueHistoryIssueTrackerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((issueHistory: HttpResponse<IssueHistoryIssueTracker>) => issueHistory.body));
        }
        return of(new IssueHistoryIssueTracker());
    }
}

export const issueHistoryRoute: Routes = [
    {
        path: 'issue-history-issue-tracker',
        component: IssueHistoryIssueTrackerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IssueHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'issue-history-issue-tracker/:id/view',
        component: IssueHistoryIssueTrackerDetailComponent,
        resolve: {
            issueHistory: IssueHistoryIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IssueHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'issue-history-issue-tracker/new',
        component: IssueHistoryIssueTrackerUpdateComponent,
        resolve: {
            issueHistory: IssueHistoryIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IssueHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'issue-history-issue-tracker/:id/edit',
        component: IssueHistoryIssueTrackerUpdateComponent,
        resolve: {
            issueHistory: IssueHistoryIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IssueHistories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const issueHistoryPopupRoute: Routes = [
    {
        path: 'issue-history-issue-tracker/:id/delete',
        component: IssueHistoryIssueTrackerDeletePopupComponent,
        resolve: {
            issueHistory: IssueHistoryIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IssueHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
