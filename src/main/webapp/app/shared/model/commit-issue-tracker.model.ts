import { Moment } from 'moment';

export interface ICommitIssueTracker {
    id?: number;
    hash?: string;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedDate?: Moment;
    lastModifiedBy?: string;
    issueId?: number;
    ownedByLogin?: string;
    ownedById?: number;
}

export class CommitIssueTracker implements ICommitIssueTracker {
    constructor(
        public id?: number,
        public hash?: string,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedDate?: Moment,
        public lastModifiedBy?: string,
        public issueId?: number,
        public ownedByLogin?: string,
        public ownedById?: number
    ) {}
}
