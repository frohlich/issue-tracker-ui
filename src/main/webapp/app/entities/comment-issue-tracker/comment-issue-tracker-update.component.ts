import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICommentIssueTracker } from 'app/shared/model/comment-issue-tracker.model';
import { CommentIssueTrackerService } from './comment-issue-tracker.service';
import { IIssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';
import { IssueIssueTrackerService } from 'app/entities/issue-issue-tracker';

@Component({
    selector: 'jhi-comment-issue-tracker-update',
    templateUrl: './comment-issue-tracker-update.component.html'
})
export class CommentIssueTrackerUpdateComponent implements OnInit {
    comment: ICommentIssueTracker;
    isSaving: boolean;

    issues: IIssueIssueTracker[];
    createdDate: string;
    lastModifiedDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private commentService: CommentIssueTrackerService,
        private issueService: IssueIssueTrackerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ comment }) => {
            this.comment = comment;
            this.createdDate = this.comment.createdDate != null ? this.comment.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastModifiedDate = this.comment.lastModifiedDate != null ? this.comment.lastModifiedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.issueService.query().subscribe(
            (res: HttpResponse<IIssueIssueTracker[]>) => {
                this.issues = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.comment.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.comment.lastModifiedDate = this.lastModifiedDate != null ? moment(this.lastModifiedDate, DATE_TIME_FORMAT) : null;
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(this.commentService.create(this.comment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICommentIssueTracker>>) {
        result.subscribe((res: HttpResponse<ICommentIssueTracker>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackIssueById(index: number, item: IIssueIssueTracker) {
        return item.id;
    }
}
