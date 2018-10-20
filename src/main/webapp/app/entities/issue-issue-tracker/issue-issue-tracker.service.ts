import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';

type EntityResponseType = HttpResponse<IIssueIssueTracker>;
type EntityArrayResponseType = HttpResponse<IIssueIssueTracker[]>;

@Injectable({ providedIn: 'root' })
export class IssueIssueTrackerService {
    public resourceUrl = SERVER_API_URL + 'api/issues';

    constructor(private http: HttpClient) {}

    create(issue: IIssueIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(issue);
        return this.http
            .post<IIssueIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(issue: IIssueIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(issue);
        return this.http
            .put<IIssueIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IIssueIssueTracker>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IIssueIssueTracker[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(issue: IIssueIssueTracker): IIssueIssueTracker {
        const copy: IIssueIssueTracker = Object.assign({}, issue, {
            duoDate: issue.duoDate != null && issue.duoDate.isValid() ? issue.duoDate.toJSON() : null,
            closedAt: issue.closedAt != null && issue.closedAt.isValid() ? issue.closedAt.toJSON() : null,
            createdDate: issue.createdDate != null && issue.createdDate.isValid() ? issue.createdDate.toJSON() : null,
            lastModifiedDate: issue.lastModifiedDate != null && issue.lastModifiedDate.isValid() ? issue.lastModifiedDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.duoDate = res.body.duoDate != null ? moment(res.body.duoDate) : null;
        res.body.closedAt = res.body.closedAt != null ? moment(res.body.closedAt) : null;
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((issue: IIssueIssueTracker) => {
            issue.duoDate = issue.duoDate != null ? moment(issue.duoDate) : null;
            issue.closedAt = issue.closedAt != null ? moment(issue.closedAt) : null;
            issue.createdDate = issue.createdDate != null ? moment(issue.createdDate) : null;
            issue.lastModifiedDate = issue.lastModifiedDate != null ? moment(issue.lastModifiedDate) : null;
        });
        return res;
    }
}
