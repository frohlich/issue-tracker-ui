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

    flowNext() {
        console.log(this.files, this.comment);
        this.issueService.flowNext(this.issueId, this.files, this.comment).subscribe(response => {
            console.log(response);
            this.activeModal.close(response);
        });
    }
}
