import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { IssueTrackerSharedLibsModule, IssueTrackerSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [IssueTrackerSharedLibsModule, IssueTrackerSharedCommonModule, NgbModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [IssueTrackerSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IssueTrackerSharedModule {}
