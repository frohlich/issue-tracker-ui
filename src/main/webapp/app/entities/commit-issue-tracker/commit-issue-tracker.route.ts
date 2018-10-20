import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommitIssueTracker } from 'app/shared/model/commit-issue-tracker.model';
import { CommitIssueTrackerService } from './commit-issue-tracker.service';
import { CommitIssueTrackerComponent } from './commit-issue-tracker.component';
import { CommitIssueTrackerDetailComponent } from './commit-issue-tracker-detail.component';
import { CommitIssueTrackerUpdateComponent } from './commit-issue-tracker-update.component';
import { CommitIssueTrackerDeletePopupComponent } from './commit-issue-tracker-delete-dialog.component';
import { ICommitIssueTracker } from 'app/shared/model/commit-issue-tracker.model';

@Injectable({ providedIn: 'root' })
export class CommitIssueTrackerResolve implements Resolve<ICommitIssueTracker> {
    constructor(private service: CommitIssueTrackerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((commit: HttpResponse<CommitIssueTracker>) => commit.body));
        }
        return of(new CommitIssueTracker());
    }
}

export const commitRoute: Routes = [
    {
        path: 'commit-issue-tracker',
        component: CommitIssueTrackerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'commit-issue-tracker/:id/view',
        component: CommitIssueTrackerDetailComponent,
        resolve: {
            commit: CommitIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'commit-issue-tracker/new',
        component: CommitIssueTrackerUpdateComponent,
        resolve: {
            commit: CommitIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'commit-issue-tracker/:id/edit',
        component: CommitIssueTrackerUpdateComponent,
        resolve: {
            commit: CommitIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commits'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commitPopupRoute: Routes = [
    {
        path: 'commit-issue-tracker/:id/delete',
        component: CommitIssueTrackerDeletePopupComponent,
        resolve: {
            commit: CommitIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
