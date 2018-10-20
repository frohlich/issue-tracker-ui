import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';
import { IssueIssueTrackerService } from './issue-issue-tracker.service';

@Component({
    selector: 'jhi-issue-issue-tracker-delete-dialog',
    templateUrl: './issue-issue-tracker-delete-dialog.component.html'
})
export class IssueIssueTrackerDeleteDialogComponent {
    issue: IIssueIssueTracker;

    constructor(
        private issueService: IssueIssueTrackerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.issueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'issueListModification',
                content: 'Deleted an issue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-issue-issue-tracker-delete-popup',
    template: ''
})
export class IssueIssueTrackerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ issue }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IssueIssueTrackerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.issue = issue;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
