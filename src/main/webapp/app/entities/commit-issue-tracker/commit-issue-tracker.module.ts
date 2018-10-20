import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IssueTrackerSharedModule } from 'app/shared';
import { IssueTrackerAdminModule } from 'app/admin/admin.module';
import {
    CommitIssueTrackerComponent,
    CommitIssueTrackerDetailComponent,
    CommitIssueTrackerUpdateComponent,
    CommitIssueTrackerDeletePopupComponent,
    CommitIssueTrackerDeleteDialogComponent,
    commitRoute,
    commitPopupRoute
} from './';

const ENTITY_STATES = [...commitRoute, ...commitPopupRoute];

@NgModule({
    imports: [IssueTrackerSharedModule, IssueTrackerAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CommitIssueTrackerComponent,
        CommitIssueTrackerDetailComponent,
        CommitIssueTrackerUpdateComponent,
        CommitIssueTrackerDeleteDialogComponent,
        CommitIssueTrackerDeletePopupComponent
    ],
    entryComponents: [
        CommitIssueTrackerComponent,
        CommitIssueTrackerUpdateComponent,
        CommitIssueTrackerDeleteDialogComponent,
        CommitIssueTrackerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IssueTrackerCommitIssueTrackerModule {}
