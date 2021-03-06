import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { IssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';
import { IssueIssueTrackerService } from './issue-issue-tracker.service';
import { IssueIssueTrackerComponent } from './issue-issue-tracker.component';
import { IssueIssueTrackerDetailComponent } from './issue-issue-tracker-detail.component';
import { IssueIssueTrackerUpdateComponent } from './issue-issue-tracker-update.component';
import { IssueIssueTrackerDeletePopupComponent } from './issue-issue-tracker-delete-dialog.component';
import { IIssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';
import { IssueHistoryIssueTrackerService } from '../issue-history-issue-tracker';
import { CommitIssueTrackerService } from '../commit-issue-tracker';

@Injectable({ providedIn: 'root' })
export class IssueIssueTrackerResolve implements Resolve<IIssueIssueTracker> {
    constructor(
        private service: IssueIssueTrackerService,
        private historyService: IssueHistoryIssueTrackerService,
        private commitService: CommitIssueTrackerService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            const historiesRequest$ = this.historyService.findByIssueId(id);
            const commitRequest$ = this.commitService.findByIssueId(id);

            return this.service.find(id).pipe(
                map((issue: HttpResponse<IssueIssueTracker>) => issue.body),
                mergeMap(is =>
                    forkJoin(historiesRequest$, commitRequest$).pipe(
                        map(data => {
                            is.histories = data[0].body;
                            is.commits = data[1].body;
                            return is;
                        })
                    )
                )
            );
        }
        return of(new IssueIssueTracker());
    }
}

export const issueRoute: Routes = [
    {
        path: 'issue-issue-tracker',
        component: IssueIssueTrackerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Issues'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'issue-issue-tracker/:id/view',
        component: IssueIssueTrackerDetailComponent,
        resolve: {
            issue: IssueIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Issues'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'issue-issue-tracker/new',
        component: IssueIssueTrackerUpdateComponent,
        resolve: {
            issue: IssueIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Issues'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'issue-issue-tracker/:id/edit',
        component: IssueIssueTrackerUpdateComponent,
        resolve: {
            issue: IssueIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Issues'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const issuePopupRoute: Routes = [
    {
        path: 'issue-issue-tracker/:id/delete',
        component: IssueIssueTrackerDeletePopupComponent,
        resolve: {
            issue: IssueIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Issues'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
