import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommitIssueTracker } from 'app/shared/model/commit-issue-tracker.model';

@Component({
    selector: 'jhi-commit-issue-tracker-detail',
    templateUrl: './commit-issue-tracker-detail.component.html'
})
export class CommitIssueTrackerDetailComponent implements OnInit {
    commit: ICommitIssueTracker;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ commit }) => {
            this.commit = commit;
        });
    }

    previousState() {
        window.history.back();
    }
}
