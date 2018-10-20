/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { IssueHistoryIssueTrackerDetailComponent } from 'app/entities/issue-history-issue-tracker/issue-history-issue-tracker-detail.component';
import { IssueHistoryIssueTracker } from 'app/shared/model/issue-history-issue-tracker.model';

describe('Component Tests', () => {
    describe('IssueHistoryIssueTracker Management Detail Component', () => {
        let comp: IssueHistoryIssueTrackerDetailComponent;
        let fixture: ComponentFixture<IssueHistoryIssueTrackerDetailComponent>;
        const route = ({ data: of({ issueHistory: new IssueHistoryIssueTracker(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [IssueHistoryIssueTrackerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IssueHistoryIssueTrackerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IssueHistoryIssueTrackerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.issueHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
