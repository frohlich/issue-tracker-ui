import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IssueTrackerSharedModule } from 'app/shared';
import { IssueTrackerAdminModule } from 'app/admin/admin.module';
import {
    ProjectIssueTrackerComponent,
    ProjectIssueTrackerDetailComponent,
    ProjectIssueTrackerUpdateComponent,
    ProjectIssueTrackerDeletePopupComponent,
    ProjectIssueTrackerDeleteDialogComponent,
    projectRoute,
    projectPopupRoute
} from './';

const ENTITY_STATES = [...projectRoute, ...projectPopupRoute];

@NgModule({
    imports: [IssueTrackerSharedModule, IssueTrackerAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProjectIssueTrackerComponent,
        ProjectIssueTrackerDetailComponent,
        ProjectIssueTrackerUpdateComponent,
        ProjectIssueTrackerDeleteDialogComponent,
        ProjectIssueTrackerDeletePopupComponent
    ],
    entryComponents: [
        ProjectIssueTrackerComponent,
        ProjectIssueTrackerUpdateComponent,
        ProjectIssueTrackerDeleteDialogComponent,
        ProjectIssueTrackerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IssueTrackerProjectIssueTrackerModule {}
