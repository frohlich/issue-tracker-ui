import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProjectIssueTracker } from 'app/shared/model/project-issue-tracker.model';

type EntityResponseType = HttpResponse<IProjectIssueTracker>;
type EntityArrayResponseType = HttpResponse<IProjectIssueTracker[]>;

@Injectable({ providedIn: 'root' })
export class ProjectIssueTrackerService {
    public resourceUrl = SERVER_API_URL + 'api/projects';

    constructor(private http: HttpClient) {}

    create(project: IProjectIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(project);
        return this.http
            .post<IProjectIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(project: IProjectIssueTracker): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(project);
        return this.http
            .put<IProjectIssueTracker>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IProjectIssueTracker>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProjectIssueTracker[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(project: IProjectIssueTracker): IProjectIssueTracker {
        const copy: IProjectIssueTracker = Object.assign({}, project, {
            createdDate: project.createdDate != null && project.createdDate.isValid() ? project.createdDate.toJSON() : null,
            lastModifiedDate:
                project.lastModifiedDate != null && project.lastModifiedDate.isValid() ? project.lastModifiedDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((project: IProjectIssueTracker) => {
            project.createdDate = project.createdDate != null ? moment(project.createdDate) : null;
            project.lastModifiedDate = project.lastModifiedDate != null ? moment(project.lastModifiedDate) : null;
        });
        return res;
    }
}
