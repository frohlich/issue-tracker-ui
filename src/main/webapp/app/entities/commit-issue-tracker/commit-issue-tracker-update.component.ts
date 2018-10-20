import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICommitIssueTracker } from 'app/shared/model/commit-issue-tracker.model';
import { CommitIssueTrackerService } from './commit-issue-tracker.service';
import { IIssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';
import { IssueIssueTrackerService } from 'app/entities/issue-issue-tracker';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-commit-issue-tracker-update',
    templateUrl: './commit-issue-tracker-update.component.html'
})
export class CommitIssueTrackerUpdateComponent implements OnInit {
    commit: ICommitIssueTracker;
    isSaving: boolean;

    issues: IIssueIssueTracker[];

    users: IUser[];
    createdDate: string;
    lastModifiedDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private commitService: CommitIssueTrackerService,
        private issueService: IssueIssueTrackerService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ commit }) => {
            this.commit = commit;
            this.createdDate = this.commit.createdDate != null ? this.commit.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastModifiedDate = this.commit.lastModifiedDate != null ? this.commit.lastModifiedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.issueService.query().subscribe(
            (res: HttpResponse<IIssueIssueTracker[]>) => {
                this.issues = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.commit.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.commit.lastModifiedDate = this.lastModifiedDate != null ? moment(this.lastModifiedDate, DATE_TIME_FORMAT) : null;
        if (this.commit.id !== undefined) {
            this.subscribeToSaveResponse(this.commitService.update(this.commit));
        } else {
            this.subscribeToSaveResponse(this.commitService.create(this.commit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICommitIssueTracker>>) {
        result.subscribe((res: HttpResponse<ICommitIssueTracker>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
