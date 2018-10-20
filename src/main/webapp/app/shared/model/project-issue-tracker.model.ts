import { Moment } from 'moment';
import { IIssueIssueTracker } from 'app/shared/model//issue-issue-tracker.model';

export interface IProjectIssueTracker {
    id?: number;
    title?: string;
    suspended?: boolean;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedDate?: Moment;
    lastModifiedBy?: string;
    issues?: IIssueIssueTracker[];
    ownedByLogin?: string;
    ownedById?: number;
}

export class ProjectIssueTracker implements IProjectIssueTracker {
    constructor(
        public id?: number,
        public title?: string,
        public suspended?: boolean,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedDate?: Moment,
        public lastModifiedBy?: string,
        public issues?: IIssueIssueTracker[],
        public ownedByLogin?: string,
        public ownedById?: number
    ) {
        this.suspended = this.suspended || false;
    }
}
