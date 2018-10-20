import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttachmentIssueTracker } from 'app/shared/model/attachment-issue-tracker.model';
import { AttachmentIssueTrackerService } from './attachment-issue-tracker.service';

@Component({
    selector: 'jhi-attachment-issue-tracker-delete-dialog',
    templateUrl: './attachment-issue-tracker-delete-dialog.component.html'
})
export class AttachmentIssueTrackerDeleteDialogComponent {
    attachment: IAttachmentIssueTracker;

    constructor(
        private attachmentService: AttachmentIssueTrackerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.attachmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'attachmentListModification',
                content: 'Deleted an attachment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-attachment-issue-tracker-delete-popup',
    template: ''
})
export class AttachmentIssueTrackerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ attachment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AttachmentIssueTrackerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.attachment = attachment;
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
