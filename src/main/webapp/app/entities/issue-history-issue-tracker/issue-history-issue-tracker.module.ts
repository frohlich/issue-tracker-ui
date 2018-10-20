import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IssueTrackerSharedModule } from 'app/shared';
import {
    IssueHistoryIssueTrackerComponent,
    IssueHistoryIssueTrackerDetailComponent,
    IssueHistoryIssueTrackerUpdateComponent,
    IssueHistoryIssueTrackerDeletePopupComponent,
    IssueHistoryIssueTrackerDeleteDialogComponent,
    issueHistoryRoute,
    issueHistoryPopupRoute
} from './';

const ENTITY_STATES = [...issueHistoryRoute, ...issueHistoryPopupRoute];

@NgModule({
    imports: [IssueTrackerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IssueHistoryIssueTrackerComponent,
        IssueHistoryIssueTrackerDetailComponent,
        IssueHistoryIssueTrackerUpdateComponent,
        IssueHistoryIssueTrackerDeleteDialogComponent,
        IssueHistoryIssueTrackerDeletePopupComponent
    ],
    entryComponents: [
        IssueHistoryIssueTrackerComponent,
        IssueHistoryIssueTrackerUpdateComponent,
        IssueHistoryIssueTrackerDeleteDialogComponent,
        IssueHistoryIssueTrackerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IssueTrackerIssueHistoryIssueTrackerModule {}
