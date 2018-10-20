import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IssueTrackerSharedModule } from 'app/shared';
import {
    AttachmentIssueTrackerComponent,
    AttachmentIssueTrackerDetailComponent,
    AttachmentIssueTrackerUpdateComponent,
    AttachmentIssueTrackerDeletePopupComponent,
    AttachmentIssueTrackerDeleteDialogComponent,
    attachmentRoute,
    attachmentPopupRoute
} from './';

const ENTITY_STATES = [...attachmentRoute, ...attachmentPopupRoute];

@NgModule({
    imports: [IssueTrackerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AttachmentIssueTrackerComponent,
        AttachmentIssueTrackerDetailComponent,
        AttachmentIssueTrackerUpdateComponent,
        AttachmentIssueTrackerDeleteDialogComponent,
        AttachmentIssueTrackerDeletePopupComponent
    ],
    entryComponents: [
        AttachmentIssueTrackerComponent,
        AttachmentIssueTrackerUpdateComponent,
        AttachmentIssueTrackerDeleteDialogComponent,
        AttachmentIssueTrackerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IssueTrackerAttachmentIssueTrackerModule {}
