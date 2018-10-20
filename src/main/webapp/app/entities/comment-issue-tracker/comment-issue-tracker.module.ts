import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IssueTrackerSharedModule } from 'app/shared';
import {
    CommentIssueTrackerComponent,
    CommentIssueTrackerDetailComponent,
    CommentIssueTrackerUpdateComponent,
    CommentIssueTrackerDeletePopupComponent,
    CommentIssueTrackerDeleteDialogComponent,
    commentRoute,
    commentPopupRoute
} from './';

const ENTITY_STATES = [...commentRoute, ...commentPopupRoute];

@NgModule({
    imports: [IssueTrackerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CommentIssueTrackerComponent,
        CommentIssueTrackerDetailComponent,
        CommentIssueTrackerUpdateComponent,
        CommentIssueTrackerDeleteDialogComponent,
        CommentIssueTrackerDeletePopupComponent
    ],
    entryComponents: [
        CommentIssueTrackerComponent,
        CommentIssueTrackerUpdateComponent,
        CommentIssueTrackerDeleteDialogComponent,
        CommentIssueTrackerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IssueTrackerCommentIssueTrackerModule {}
