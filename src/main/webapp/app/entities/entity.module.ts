import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IssueTrackerProjectIssueTrackerModule } from './project-issue-tracker/project-issue-tracker.module';
import { IssueTrackerIssueIssueTrackerModule } from './issue-issue-tracker/issue-issue-tracker.module';
import { IssueTrackerIssueHistoryIssueTrackerModule } from './issue-history-issue-tracker/issue-history-issue-tracker.module';
import { IssueTrackerCommitIssueTrackerModule } from './commit-issue-tracker/commit-issue-tracker.module';
import { IssueTrackerAttachmentIssueTrackerModule } from './attachment-issue-tracker/attachment-issue-tracker.module';
import { IssueTrackerCommentIssueTrackerModule } from './comment-issue-tracker/comment-issue-tracker.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        IssueTrackerProjectIssueTrackerModule,
        IssueTrackerIssueIssueTrackerModule,
        IssueTrackerIssueHistoryIssueTrackerModule,
        IssueTrackerCommitIssueTrackerModule,
        IssueTrackerAttachmentIssueTrackerModule,
        IssueTrackerCommentIssueTrackerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IssueTrackerEntityModule {}
