import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IIssueIssueTracker, IssueType, Priority } from 'app/shared/model/issue-issue-tracker.model';
import { IssueIssueTrackerService } from './issue-issue-tracker.service';
import { IUser, UserService } from 'app/core';
import { IProjectIssueTracker } from 'app/shared/model/project-issue-tracker.model';
import { ProjectIssueTrackerService } from 'app/entities/project-issue-tracker';

@Component({
    selector: 'jhi-issue-issue-tracker-update',
    templateUrl: './issue-issue-tracker-update.component.html'
})
export class IssueIssueTrackerUpdateComponent implements OnInit {
    issue: IIssueIssueTracker;
    isSaving: boolean;

    issues: IIssueIssueTracker[];

    users: IUser[];

    projects: IProjectIssueTracker[];
    duoDate: string;
    closedAt: string;
    createdDate: string;
    lastModifiedDate: string;

    blockType = false;

    constructor(
        private jhiAlertService: JhiAlertService,
        private issueService: IssueIssueTrackerService,
        private userService: UserService,
        private projectService: ProjectIssueTrackerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ issue }) => {
            this.issue = issue;
            this.duoDate = this.issue.duoDate != null ? this.issue.duoDate.format(DATE_TIME_FORMAT) : null;
            this.closedAt = this.issue.closedAt != null ? this.issue.closedAt.format(DATE_TIME_FORMAT) : null;
            this.createdDate = this.issue.createdDate != null ? this.issue.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastModifiedDate = this.issue.lastModifiedDate != null ? this.issue.lastModifiedDate.format(DATE_TIME_FORMAT) : null;
            if (!this.issue.id || this.issue.id <= 0) {
                this.issue.projectId = +this.activatedRoute.snapshot.queryParams['projectId'] || null;
                this.issue.issueId = +this.activatedRoute.snapshot.queryParams['parentId'] || null;
                this.issue.type = IssueType.STORY;
                this.issue.priority = Priority.MEDIUM;
            }
            if (this.issue.issueId) {
                this.issue.type = IssueType.BUG;
                this.blockType = true;
            }
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
        this.projectService.query().subscribe(
            (res: HttpResponse<IProjectIssueTracker[]>) => {
                this.projects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.issue.duoDate = this.duoDate != null ? moment(this.duoDate, DATE_TIME_FORMAT) : null;
        this.issue.closedAt = this.closedAt != null ? moment(this.closedAt, DATE_TIME_FORMAT) : null;
        this.issue.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.issue.lastModifiedDate = this.lastModifiedDate != null ? moment(this.lastModifiedDate, DATE_TIME_FORMAT) : null;
        if (this.issue.id !== undefined) {
            this.subscribeToSaveResponse(this.issueService.update(this.issue));
        } else {
            this.subscribeToSaveResponse(this.issueService.create(this.issue));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIssueIssueTracker>>) {
        result.subscribe((res: HttpResponse<IIssueIssueTracker>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjectById(index: number, item: IProjectIssueTracker) {
        return item.id;
    }
}
