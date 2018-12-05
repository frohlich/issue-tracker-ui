import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIssueHistoryIssueTracker } from 'app/shared/model/issue-history-issue-tracker.model';

type EntityResponseType = HttpResponse<IIssueHistoryIssueTracker>;
type EntityArrayResponseType = HttpResponse<IIssueHistoryIssueTracker[]>;

@Injectable({ providedIn: 'root' })
export class IssueHistoryIssueTrackerService {
    public resourceUrl = SERVER_API_URL + 'api/issue-histories';
    public resourceQueryUrl = SERVER_API_URL + 'api/_search/issue-histories';

    constructor(private http: HttpClient) {}

    create(issueHistory: IIssueHistoryIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(issueHistory);
        return this.http
            .post<IIssueHistoryIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(issueHistory: IIssueHistoryIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(issueHistory);
        return this.http
            .put<IIssueHistoryIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IIssueHistoryIssueTracker>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findByIssueId(id: number): Observable<EntityArrayResponseType> {
        const options = createRequestOption({});
        return this.http
            .get<IIssueHistoryIssueTracker[]>(`${this.resourceUrl}/byissueid/${id}`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IIssueHistoryIssueTracker[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IIssueHistoryIssueTracker[]>(this.resourceQueryUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(issueHistory: IIssueHistoryIssueTracker): IIssueHistoryIssueTracker {
        const copy: IIssueHistoryIssueTracker = Object.assign({}, issueHistory, {
            createdDate: issueHistory.createdDate != null && issueHistory.createdDate.isValid() ? issueHistory.createdDate.toJSON() : null,
            lastModifiedDate:
                issueHistory.lastModifiedDate != null && issueHistory.lastModifiedDate.isValid()
                    ? issueHistory.lastModifiedDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((issueHistory: IIssueHistoryIssueTracker) => {
            issueHistory.createdDate = issueHistory.createdDate != null ? moment(issueHistory.createdDate) : null;
            issueHistory.lastModifiedDate = issueHistory.lastModifiedDate != null ? moment(issueHistory.lastModifiedDate) : null;
        });
        return res;
    }
}
