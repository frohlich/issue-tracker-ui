import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IssueTrackerSharedModule } from 'app/shared';
import { IssueTrackerAdminModule } from 'app/admin/admin.module';
import {
    IssueIssueTrackerComponent,
    IssueIssueTrackerDetailComponent,
    IssueIssueTrackerUpdateComponent,
    IssueIssueTrackerDeletePopupComponent,
    IssueIssueTrackerDeleteDialogComponent,
    issueRoute,
    issuePopupRoute
} from './';

const ENTITY_STATES = [...issueRoute, ...issuePopupRoute];

@NgModule({
    imports: [IssueTrackerSharedModule, IssueTrackerAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IssueIssueTrackerComponent,
        IssueIssueTrackerDetailComponent,
        IssueIssueTrackerUpdateComponent,
        IssueIssueTrackerDeleteDialogComponent,
        IssueIssueTrackerDeletePopupComponent
    ],
    entryComponents: [
        IssueIssueTrackerComponent,
        IssueIssueTrackerUpdateComponent,
        IssueIssueTrackerDeleteDialogComponent,
        IssueIssueTrackerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IssueTrackerIssueIssueTrackerModule {}
