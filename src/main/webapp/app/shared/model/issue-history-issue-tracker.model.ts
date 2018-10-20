import { Moment } from 'moment';

export const enum Flow {
    BACKLOG = 'BACKLOG',
    SPECIFICATION = 'SPECIFICATION',
    CODING = 'CODING',
    TEST = 'TEST',
    FINISHED = 'FINISHED'
}

export interface IIssueHistoryIssueTracker {
    id?: number;
    flowStart?: Flow;
    flowEnd?: Flow;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedDate?: Moment;
    lastModifiedBy?: string;
    issueId?: number;
    commentId?: number;
}

export class IssueHistoryIssueTracker implements IIssueHistoryIssueTracker {
    constructor(
        public id?: number,
        public flowStart?: Flow,
        public flowEnd?: Flow,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedDate?: Moment,
        public lastModifiedBy?: string,
        public issueId?: number,
        public commentId?: number
    ) {}
}
