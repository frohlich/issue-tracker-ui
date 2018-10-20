import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttachmentIssueTracker } from 'app/shared/model/attachment-issue-tracker.model';
import { AttachmentIssueTrackerService } from './attachment-issue-tracker.service';
import { AttachmentIssueTrackerComponent } from './attachment-issue-tracker.component';
import { AttachmentIssueTrackerDetailComponent } from './attachment-issue-tracker-detail.component';
import { AttachmentIssueTrackerUpdateComponent } from './attachment-issue-tracker-update.component';
import { AttachmentIssueTrackerDeletePopupComponent } from './attachment-issue-tracker-delete-dialog.component';
import { IAttachmentIssueTracker } from 'app/shared/model/attachment-issue-tracker.model';

@Injectable({ providedIn: 'root' })
export class AttachmentIssueTrackerResolve implements Resolve<IAttachmentIssueTracker> {
    constructor(private service: AttachmentIssueTrackerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((attachment: HttpResponse<AttachmentIssueTracker>) => attachment.body));
        }
        return of(new AttachmentIssueTracker());
    }
}

export const attachmentRoute: Routes = [
    {
        path: 'attachment-issue-tracker',
        component: AttachmentIssueTrackerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Attachments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attachment-issue-tracker/:id/view',
        component: AttachmentIssueTrackerDetailComponent,
        resolve: {
            attachment: AttachmentIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Attachments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attachment-issue-tracker/new',
        component: AttachmentIssueTrackerUpdateComponent,
        resolve: {
            attachment: AttachmentIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Attachments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attachment-issue-tracker/:id/edit',
        component: AttachmentIssueTrackerUpdateComponent,
        resolve: {
            attachment: AttachmentIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Attachments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const attachmentPopupRoute: Routes = [
    {
        path: 'attachment-issue-tracker/:id/delete',
        component: AttachmentIssueTrackerDeletePopupComponent,
        resolve: {
            attachment: AttachmentIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Attachments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
