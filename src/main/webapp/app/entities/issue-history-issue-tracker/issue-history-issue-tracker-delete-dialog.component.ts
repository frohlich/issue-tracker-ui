import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIssueHistoryIssueTracker } from 'app/shared/model/issue-history-issue-tracker.model';
import { IssueHistoryIssueTrackerService } from './issue-history-issue-tracker.service';

@Component({
    selector: 'jhi-issue-history-issue-tracker-delete-dialog',
    templateUrl: './issue-history-issue-tracker-delete-dialog.component.html'
})
export class IssueHistoryIssueTrackerDeleteDialogComponent {
    issueHistory: IIssueHistoryIssueTracker;

    constructor(
        private issueHistoryService: IssueHistoryIssueTrackerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.issueHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'issueHistoryListModification',
                content: 'Deleted an issueHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-issue-history-issue-tracker-delete-popup',
    template: ''
})
export class IssueHistoryIssueTrackerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ issueHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IssueHistoryIssueTrackerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.issueHistory = issueHistory;
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
