import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICommentIssueTracker } from 'app/shared/model/comment-issue-tracker.model';

type EntityResponseType = HttpResponse<ICommentIssueTracker>;
type EntityArrayResponseType = HttpResponse<ICommentIssueTracker[]>;

@Injectable({ providedIn: 'root' })
export class CommentIssueTrackerService {
    public resourceUrl = SERVER_API_URL + 'api/comments';

    constructor(private http: HttpClient) {}

    create(comment: ICommentIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(comment);
        return this.http
            .post<ICommentIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(comment: ICommentIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(comment);
        return this.http
            .put<ICommentIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICommentIssueTracker>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICommentIssueTracker[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(comment: ICommentIssueTracker): ICommentIssueTracker {
        const copy: ICommentIssueTracker = Object.assign({}, comment, {
            createdDate: comment.createdDate != null && comment.createdDate.isValid() ? comment.createdDate.toJSON() : null,
            lastModifiedDate:
                comment.lastModifiedDate != null && comment.lastModifiedDate.isValid() ? comment.lastModifiedDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((comment: ICommentIssueTracker) => {
            comment.createdDate = comment.createdDate != null ? moment(comment.createdDate) : null;
            comment.lastModifiedDate = comment.lastModifiedDate != null ? moment(comment.lastModifiedDate) : null;
        });
        return res;
    }
}
