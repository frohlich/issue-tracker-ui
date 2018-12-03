import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';

@Component({
    selector: 'jhi-issue-issue-tracker-detail',
    templateUrl: './issue-issue-tracker-detail.component.html'
})
export class IssueIssueTrackerDetailComponent implements OnInit {
    issue: IIssueIssueTracker;
    histories: any[] = [
        {
            id: '100',
            flowStart: '100',
            flowEnd: '100',
            createdBy: '100',
            createdDate: '100',
            lastModifiedDate: '100',
            lastModifiedBy: '100',
            issueId: '100',
            commentId: '100'
        }
    ];
    commits: any[] = [{ hash: '123', createdBy: 'createdBy', createdDate: 'createdDate' }];

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
