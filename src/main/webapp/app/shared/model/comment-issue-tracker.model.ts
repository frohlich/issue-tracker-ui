import { Moment } from 'moment';
import { IAttachmentIssueTracker } from 'app/shared/model//attachment-issue-tracker.model';

export interface ICommentIssueTracker {
    id?: number;
    comment?: string;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedDate?: Moment;
    lastModifiedBy?: string;
    issueId?: number;
    attachments?: IAttachmentIssueTracker[];
}

export class CommentIssueTracker implements ICommentIssueTracker {
    constructor(
        public id?: number,
        public comment?: string,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedDate?: Moment,
        public lastModifiedBy?: string,
        public issueId?: number,
        public attachments?: IAttachmentIssueTracker[]
    ) {}
}
