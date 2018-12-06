import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICommitIssueTracker } from 'app/shared/model/commit-issue-tracker.model';

type EntityResponseType = HttpResponse<ICommitIssueTracker>;
type EntityArrayResponseType = HttpResponse<ICommitIssueTracker[]>;

@Injectable({ providedIn: 'root' })
export class CommitIssueTrackerService {
    public resourceUrl = SERVER_API_URL + 'api/commits';

    constructor(private http: HttpClient) {}

    create(commit: ICommitIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(commit);
        return this.http
            .post<ICommitIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(commit: ICommitIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(commit);
        return this.http
            .put<ICommitIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICommitIssueTracker>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findByIssueId(id: number): Observable<EntityArrayResponseType> {
        const options = createRequestOption({});
        return this.http
            .get<ICommitIssueTracker[]>(`${this.resourceUrl}/byissueid/${id}`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICommitIssueTracker[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(commit: ICommitIssueTracker): ICommitIssueTracker {
        const copy: ICommitIssueTracker = Object.assign({}, commit, {
            createdDate: commit.createdDate != null && commit.createdDate.isValid() ? commit.createdDate.toJSON() : null,
            lastModifiedDate: commit.lastModifiedDate != null && commit.lastModifiedDate.isValid() ? commit.lastModifiedDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((commit: ICommitIssueTracker) => {
            commit.createdDate = commit.createdDate != null ? moment(commit.createdDate) : null;
            commit.lastModifiedDate = commit.lastModifiedDate != null ? moment(commit.lastModifiedDate) : null;
        });
        return res;
    }
}
