/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IssueIssueTrackerService } from 'app/entities/issue-issue-tracker/issue-issue-tracker.service';
import { IIssueIssueTracker, IssueIssueTracker, Flow, IssueType, Priority } from 'app/shared/model/issue-issue-tracker.model';

describe('Service Tests', () => {
    describe('IssueIssueTracker Service', () => {
        let injector: TestBed;
        let service: IssueIssueTrackerService;
        let httpMock: HttpTestingController;
        let elemDefault: IIssueIssueTracker;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(IssueIssueTrackerService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new IssueIssueTracker(
                0,
                'AAAAAAA',
                'AAAAAAA',
                Flow.BACKLOG,
                IssueType.STORY,
                Priority.CRITICAL,
                currentDate,
                currentDate,
                'AAAAAAA',
                currentDate,
                currentDate,
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        duoDate: currentDate.format(DATE_TIME_FORMAT),
                        closedAt: currentDate.format(DATE_TIME_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        lastModifiedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a IssueIssueTracker', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        duoDate: currentDate.format(DATE_TIME_FORMAT),
                        closedAt: currentDate.format(DATE_TIME_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        lastModifiedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        duoDate: currentDate,
                        closedAt: currentDate,
                        createdDate: currentDate,
                        lastModifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new IssueIssueTracker(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a IssueIssueTracker', async () => {
                const returnedFromService = Object.assign(
                    {
                        title: 'BBBBBB',
                        description: 'BBBBBB',
                        status: 'BBBBBB',
                        type: 'BBBBBB',
                        priority: 'BBBBBB',
                        duoDate: currentDate.format(DATE_TIME_FORMAT),
                        closedAt: currentDate.format(DATE_TIME_FORMAT),
                        createdBy: 'BBBBBB',
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        lastModifiedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastModifiedBy: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        duoDate: currentDate,
                        closedAt: currentDate,
                        createdDate: currentDate,
                        lastModifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of IssueIssueTracker', async () => {
                const returnedFromService = Object.assign(
                    {
                        title: 'BBBBBB',
                        description: 'BBBBBB',
                        status: 'BBBBBB',
                        type: 'BBBBBB',
                        priority: 'BBBBBB',
                        duoDate: currentDate.format(DATE_TIME_FORMAT),
                        closedAt: currentDate.format(DATE_TIME_FORMAT),
                        createdBy: 'BBBBBB',
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        lastModifiedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastModifiedBy: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        duoDate: currentDate,
                        closedAt: currentDate,
                        createdDate: currentDate,
                        lastModifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(take(1), map(resp => resp.body))
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a IssueIssueTracker', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
