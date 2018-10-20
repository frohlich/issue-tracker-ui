import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentIssueTracker } from 'app/shared/model/comment-issue-tracker.model';
import { CommentIssueTrackerService } from './comment-issue-tracker.service';
import { CommentIssueTrackerComponent } from './comment-issue-tracker.component';
import { CommentIssueTrackerDetailComponent } from './comment-issue-tracker-detail.component';
import { CommentIssueTrackerUpdateComponent } from './comment-issue-tracker-update.component';
import { CommentIssueTrackerDeletePopupComponent } from './comment-issue-tracker-delete-dialog.component';
import { ICommentIssueTracker } from 'app/shared/model/comment-issue-tracker.model';

@Injectable({ providedIn: 'root' })
export class CommentIssueTrackerResolve implements Resolve<ICommentIssueTracker> {
    constructor(private service: CommentIssueTrackerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((comment: HttpResponse<CommentIssueTracker>) => comment.body));
        }
        return of(new CommentIssueTracker());
    }
}

export const commentRoute: Routes = [
    {
        path: 'comment-issue-tracker',
        component: CommentIssueTrackerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'comment-issue-tracker/:id/view',
        component: CommentIssueTrackerDetailComponent,
        resolve: {
            comment: CommentIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'comment-issue-tracker/new',
        component: CommentIssueTrackerUpdateComponent,
        resolve: {
            comment: CommentIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'comment-issue-tracker/:id/edit',
        component: CommentIssueTrackerUpdateComponent,
        resolve: {
            comment: CommentIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentPopupRoute: Routes = [
    {
        path: 'comment-issue-tracker/:id/delete',
        component: CommentIssueTrackerDeletePopupComponent,
        resolve: {
            comment: CommentIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
