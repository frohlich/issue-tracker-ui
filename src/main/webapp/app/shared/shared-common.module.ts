import { NgModule } from '@angular/core';

import { IssueTrackerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [IssueTrackerSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [IssueTrackerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class IssueTrackerSharedCommonModule {}
