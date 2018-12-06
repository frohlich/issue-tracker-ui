import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';
import { IssueIssueTrackerService } from '../issue-issue-tracker.service';
import { Form } from '@angular/forms';

@Component({
    selector: 'jhi-issue-finish-form-modal',
    templateUrl: './issue-finish-form-modal.component.html',
    styles: []
})
export class IssueFinishFormModalComponent implements OnInit {
    flowForm: Form;
    files: File[];
    comment: string;
    @Input() issueId: number;
    @Input() isCancelation: boolean;

    constructor(private activeModal: NgbActiveModal, private issueService: IssueIssueTrackerService) {}

    ngOnInit() {}

    onFileChange(event) {
        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            this.files = event.target.files;
        }
    }
    closeModal() {
        this.activeModal.close('Modal Closed');
    }

    action() {
        if (this.isCancelation) {
            this.cancel();
        } else {
            this.flowNext();
        }
    }

    cancel() {
        console.log(this.files, this.comment);
        const attachs = this.files || [];
        this.issueService.cancel(this.issueId, attachs, this.comment).subscribe(response => {
            console.log(response);
            this.activeModal.close(response);
        });
    }

    flowNext() {
        console.log(this.files, this.comment);
        const attachs = this.files || [];
        this.issueService.flowNext(this.issueId, attachs, this.comment).subscribe(response => {
            console.log(response);
            this.activeModal.close(response);
        });
    }
}
