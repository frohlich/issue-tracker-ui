import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueFinishFormModalComponent } from './issue-finish-form-modal/issue-finish-form-modal.component';

@Component({
    selector: 'jhi-issue-issue-tracker-detail',
    templateUrl: './issue-issue-tracker-detail.component.html'
})
export class IssueIssueTrackerDetailComponent implements OnInit {
    issue: IIssueIssueTracker;

    constructor(private activatedRoute: ActivatedRoute, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ issue }) => {
            this.issue = issue;
        });
    }

    previousState() {
        window.history.back();
    }

    openFormModal() {
        const modalRef = this.modalService.open(IssueFinishFormModalComponent);
        modalRef.componentInstance.issueId = this.issue.id;
        modalRef.result
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }
}
