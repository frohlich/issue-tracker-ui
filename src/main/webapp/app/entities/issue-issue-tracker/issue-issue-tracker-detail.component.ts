import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueFinishFormModalComponent } from './issue-finish-form-modal/issue-finish-form-modal.component';
import { IssueHistoryIssueTrackerService } from '../issue-history-issue-tracker';
import { AttachmentIssueTrackerService } from '../attachment-issue-tracker';
import { map, mergeMap } from 'rxjs/operators';
import { from, forkJoin } from 'rxjs';
import { IssueAttachmentsModalComponent } from './issue-attachments-modal/issue-attachments-modal.component';
import { CommitIssueTrackerService } from '../commit-issue-tracker';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-issue-issue-tracker-detail',
    templateUrl: './issue-issue-tracker-detail.component.html'
})
export class IssueIssueTrackerDetailComponent implements OnInit {
    issue: IIssueIssueTracker;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
        private issueHistoryService: IssueHistoryIssueTrackerService,
        private attachmentService: AttachmentIssueTrackerService,
        private historyService: IssueHistoryIssueTrackerService,
        private commitService: CommitIssueTrackerService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ issue }) => {
            this.issue = issue;
        });

        this.issue.histories.map(h => {
            this.attachmentService.findByCommentId(h.commentId).subscribe(body => {
                h.attachments = body.body;
            });
        });
    }

    previousState() {
        window.history.back();
    }

    openFormModal(cancel: boolean) {
        const modalRef = this.modalService.open(IssueFinishFormModalComponent);
        modalRef.componentInstance.issueId = this.issue.id;
        modalRef.componentInstance.isCancelation = cancel;
        modalRef.result
            .then(result => {
                console.log(result);
                this.reloadHistories();
            })
            .catch(error => {
                console.log(error);
            });
    }

    openAttachmentModal(history) {
        const modalRef = this.modalService.open(IssueAttachmentsModalComponent);
        modalRef.componentInstance.attachments = history.attachments;
        modalRef.result
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }

    reloadHistories() {
        const historiesRequest$ = this.historyService.findByIssueId(this.issue.id);
        const commitRequest$ = this.commitService.findByIssueId(this.issue.id);

        forkJoin(historiesRequest$, commitRequest$).subscribe(data => {
            this.issue.histories = data[0].body;
            this.issue.commits = data[1].body;
            this.issue.histories.map(h => {
                this.attachmentService.findByCommentId(h.commentId).subscribe(body => {
                    h.attachments = body.body;
                });
            });
        });
    }
}
