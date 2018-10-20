import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';

@Component({
    selector: 'jhi-issue-issue-tracker-detail',
    templateUrl: './issue-issue-tracker-detail.component.html'
})
export class IssueIssueTrackerDetailComponent implements OnInit {
    issue: IIssueIssueTracker;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ issue }) => {
            this.issue = issue;
        });
    }

    previousState() {
        window.history.back();
    }
}
