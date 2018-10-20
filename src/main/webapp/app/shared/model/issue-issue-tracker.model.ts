import { Moment } from 'moment';
import { ICommitIssueTracker } from 'app/shared/model//commit-issue-tracker.model';
import { ICommentIssueTracker } from 'app/shared/model//comment-issue-tracker.model';
import { IIssueIssueTracker } from 'app/shared/model//issue-issue-tracker.model';

export const enum Flow {
    BACKLOG = 'BACKLOG',
    SPECIFICATION = 'SPECIFICATION',
    CODING = 'CODING',
    TEST = 'TEST',
    FINISHED = 'FINISHED'
}

export const enum IssueType {
    STORY = 'STORY',
    BUG = 'BUG',
    SPIKE = 'SPIKE'
}

export const enum Priority {
    CRITICAL = 'CRITICAL',
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}

export interface IIssueIssueTracker {
    id?: number;
    title?: string;
    description?: string;
    status?: Flow;
    type?: IssueType;
    priority?: Priority;
    duoDate?: Moment;
    closedAt?: Moment;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedDate?: Moment;
    lastModifiedBy?: string;
    commits?: ICommitIssueTracker[];
    comments?: ICommentIssueTracker[];
    issueId?: number;
    parents?: IIssueIssueTracker[];
    closedByLogin?: string;
    closedById?: number;
    assignedToLogin?: string;
    assignedToId?: number;
    reportedByLogin?: string;
    reportedById?: number;
    projectId?: number;
}

export class IssueIssueTracker implements IIssueIssueTracker {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public status?: Flow,
        public type?: IssueType,
        public priority?: Priority,
        public duoDate?: Moment,
        public closedAt?: Moment,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedDate?: Moment,
        public lastModifiedBy?: string,
        public commits?: ICommitIssueTracker[],
        public comments?: ICommentIssueTracker[],
        public issueId?: number,
        public parents?: IIssueIssueTracker[],
        public closedByLogin?: string,
        public closedById?: number,
        public assignedToLogin?: string,
        public assignedToId?: number,
        public reportedByLogin?: string,
        public reportedById?: number,
        public projectId?: number
    ) {}
}
