import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommentIssueTracker } from 'app/shared/model/comment-issue-tracker.model';

@Component({
    selector: 'jhi-comment-issue-tracker-detail',
    templateUrl: './comment-issue-tracker-detail.component.html'
})
export class CommentIssueTrackerDetailComponent implements OnInit {
    comment: ICommentIssueTracker;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ comment }) => {
            this.comment = comment;
        });
    }

    previousState() {
        window.history.back();
    }
}
