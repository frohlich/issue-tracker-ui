import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommitIssueTracker } from 'app/shared/model/commit-issue-tracker.model';
import { CommitIssueTrackerService } from './commit-issue-tracker.service';

@Component({
    selector: 'jhi-commit-issue-tracker-delete-dialog',
    templateUrl: './commit-issue-tracker-delete-dialog.component.html'
})
export class CommitIssueTrackerDeleteDialogComponent {
    commit: ICommitIssueTracker;

    constructor(
        private commitService: CommitIssueTrackerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'commitListModification',
                content: 'Deleted an commit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-commit-issue-tracker-delete-popup',
    template: ''
})
export class CommitIssueTrackerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ commit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CommitIssueTrackerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.commit = commit;
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
