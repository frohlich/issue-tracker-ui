import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAttachmentIssueTracker } from 'app/shared/model/attachment-issue-tracker.model';

type EntityResponseType = HttpResponse<IAttachmentIssueTracker>;
type EntityArrayResponseType = HttpResponse<IAttachmentIssueTracker[]>;

@Injectable({ providedIn: 'root' })
export class AttachmentIssueTrackerService {
    public resourceUrl = SERVER_API_URL + 'api/attachments';

    constructor(private http: HttpClient) {}

    create(attachment: IAttachmentIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(attachment);
        return this.http
            .post<IAttachmentIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(attachment: IAttachmentIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(attachment);
        return this.http
            .put<IAttachmentIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAttachmentIssueTracker>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAttachmentIssueTracker[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    findByCommentId(id: number): Observable<EntityArrayResponseType> {
        const options = createRequestOption({});
        return this.http
            .get<IAttachmentIssueTracker[]>(`${this.resourceUrl}/bycommentid/${id}`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(attachment: IAttachmentIssueTracker): IAttachmentIssueTracker {
        const copy: IAttachmentIssueTracker = Object.assign({}, attachment, {
            createdDate: attachment.createdDate != null && attachment.createdDate.isValid() ? attachment.createdDate.toJSON() : null,
            lastModifiedDate:
                attachment.lastModifiedDate != null && attachment.lastModifiedDate.isValid() ? attachment.lastModifiedDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((attachment: IAttachmentIssueTracker) => {
            attachment.createdDate = attachment.createdDate != null ? moment(attachment.createdDate) : null;
            attachment.lastModifiedDate = attachment.lastModifiedDate != null ? moment(attachment.lastModifiedDate) : null;
        });
        return res;
    }
}
