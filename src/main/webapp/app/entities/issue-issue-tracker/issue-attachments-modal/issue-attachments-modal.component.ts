import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';
import { IssueIssueTrackerService } from '../issue-issue-tracker.service';
import { Form } from '@angular/forms';
import { IAttachmentIssueTracker } from 'app/shared/model/attachment-issue-tracker.model';
import { AttachmentIssueTrackerService } from 'app/entities/attachment-issue-tracker';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'jhi-issue-attachments-modal',
    templateUrl: './issue-attachments-modal.component.html',
    styles: []
})
export class IssueAttachmentsModalComponent implements OnInit {
    @Input() attachments: IAttachmentIssueTracker[];

    constructor(private activeModal: NgbActiveModal, private http: HttpClient) {}

    ngOnInit() {}

    closeModal() {
        this.activeModal.close('Modal Closed');
    }

    salvar(id: number, filename: string, mediatype: string) {
        const resourceUrl = 'api/attachments';
        this.http
            .get(`${resourceUrl}/download/${id}`, { responseType: 'arraybuffer' })
            .subscribe(response => this.downloadFile(mediatype, response, filename));
    }

    downloadFile(contentType: string, data: any, fileName: string) {
        const blob = new Blob([data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }
}
