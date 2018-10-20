import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IIssueHistoryIssueTracker } from 'app/shared/model/issue-history-issue-tracker.model';
import { IssueHistoryIssueTrackerService } from './issue-history-issue-tracker.service';
import { IIssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';
import { IssueIssueTrackerService } from 'app/entities/issue-issue-tracker';
import { ICommentIssueTracker } from 'app/shared/model/comment-issue-tracker.model';
import { CommentIssueTrackerService } from 'app/entities/comment-issue-tracker';

@Component({
    selector: 'jhi-issue-history-issue-tracker-update',
    templateUrl: './issue-history-issue-tracker-update.component.html'
})
export class IssueHistoryIssueTrackerUpdateComponent implements OnInit {
    issueHistory: IIssueHistoryIssueTracker;
    isSaving: boolean;

    issues: IIssueIssueTracker[];

    comments: ICommentIssueTracker[];
    createdDate: string;
    lastModifiedDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private issueHistoryService: IssueHistoryIssueTrackerService,
        private issueService: IssueIssueTrackerService,
        private commentService: CommentIssueTrackerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ issueHistory }) => {
            this.issueHistory = issueHistory;
            this.createdDate = this.issueHistory.createdDate != null ? this.issueHistory.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastModifiedDate =
                this.issueHistory.lastModifiedDate != null ? this.issueHistory.lastModifiedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.issueService.query().subscribe(
            (res: HttpResponse<IIssueIssueTracker[]>) => {
                this.issues = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.commentService.query().subscribe(
            (res: HttpResponse<ICommentIssueTracker[]>) => {
                this.comments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.issueHistory.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.issueHistory.lastModifiedDate = this.lastModifiedDate != null ? moment(this.lastModifiedDate, DATE_TIME_FORMAT) : null;
        if (this.issueHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.issueHistoryService.update(this.issueHistory));
        } else {
            this.subscribeToSaveResponse(this.issueHistoryService.create(this.issueHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIssueHistoryIssueTracker>>) {
        result.subscribe(
            (res: HttpResponse<IIssueHistoryIssueTracker>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackCommentById(index: number, item: ICommentIssueTracker) {
        return item.id;
    }
}
