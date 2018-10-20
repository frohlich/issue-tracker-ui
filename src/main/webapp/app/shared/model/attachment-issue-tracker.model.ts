import { Moment } from 'moment';

export interface IAttachmentIssueTracker {
    id?: number;
    filename?: string;
    size?: number;
    hash?: string;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedDate?: Moment;
    lastModifiedBy?: string;
    commentId?: number;
}

export class AttachmentIssueTracker implements IAttachmentIssueTracker {
    constructor(
        public id?: number,
        public filename?: string,
        public size?: number,
        public hash?: string,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedDate?: Moment,
        public lastModifiedBy?: string,
        public commentId?: number
    ) {}
}
