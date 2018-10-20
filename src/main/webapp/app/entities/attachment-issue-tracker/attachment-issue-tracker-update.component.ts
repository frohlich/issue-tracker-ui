import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IAttachmentIssueTracker } from 'app/shared/model/attachment-issue-tracker.model';
import { AttachmentIssueTrackerService } from './attachment-issue-tracker.service';
import { ICommentIssueTracker } from 'app/shared/model/comment-issue-tracker.model';
import { CommentIssueTrackerService } from 'app/entities/comment-issue-tracker';

@Component({
    selector: 'jhi-attachment-issue-tracker-update',
    templateUrl: './attachment-issue-tracker-update.component.html'
})
export class AttachmentIssueTrackerUpdateComponent implements OnInit {
    attachment: IAttachmentIssueTracker;
    isSaving: boolean;

    comments: ICommentIssueTracker[];
    createdDate: string;
    lastModifiedDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private attachmentService: AttachmentIssueTrackerService,
        private commentService: CommentIssueTrackerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ attachment }) => {
            this.attachment = attachment;
            this.createdDate = this.attachment.createdDate != null ? this.attachment.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastModifiedDate =
                this.attachment.lastModifiedDate != null ? this.attachment.lastModifiedDate.format(DATE_TIME_FORMAT) : null;
        });
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
        this.attachment.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.attachment.lastModifiedDate = this.lastModifiedDate != null ? moment(this.lastModifiedDate, DATE_TIME_FORMAT) : null;
        if (this.attachment.id !== undefined) {
            this.subscribeToSaveResponse(this.attachmentService.update(this.attachment));
        } else {
            this.subscribeToSaveResponse(this.attachmentService.create(this.attachment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAttachmentIssueTracker>>) {
        result.subscribe(
            (res: HttpResponse<IAttachmentIssueTracker>) => this.onSaveSuccess(),
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

    trackCommentById(index: number, item: ICommentIssueTracker) {
        return item.id;
    }
}
