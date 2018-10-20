import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAttachmentIssueTracker } from 'app/shared/model/attachment-issue-tracker.model';

@Component({
    selector: 'jhi-attachment-issue-tracker-detail',
    templateUrl: './attachment-issue-tracker-detail.component.html'
})
export class AttachmentIssueTrackerDetailComponent implements OnInit {
    attachment: IAttachmentIssueTracker;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ attachment }) => {
            this.attachment = attachment;
        });
    }

    previousState() {
        window.history.back();
    }
}
