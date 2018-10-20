import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIssueHistoryIssueTracker } from 'app/shared/model/issue-history-issue-tracker.model';

@Component({
    selector: 'jhi-issue-history-issue-tracker-detail',
    templateUrl: './issue-history-issue-tracker-detail.component.html'
})
export class IssueHistoryIssueTrackerDetailComponent implements OnInit {
    issueHistory: IIssueHistoryIssueTracker;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ issueHistory }) => {
            this.issueHistory = issueHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
